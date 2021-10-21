/* eslint-disable no-constant-condition */
<template>
  <div></div>
</template>


<script>
function base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export default {
  data() {
    return { uuid: "", aes_secret: undefined };
  },
  props: {
    negotiateURL: String,
  },
  methods: {
    async negotiateSecret() {
      let bytes = new Uint8Array(32);
      let client_random = window.crypto.getRandomValues(bytes);
      let client_hello = {
        client_random: window.btoa(
          client_random.reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        ),
        client_time: new Date().getTime(),
        client_cipher_suite: "ECDH_RSA_AES128_GCM_SHA256",
      };
      let resp = await this.$http.post(this.negotiateURL, client_hello);
      let server_hello = resp.data;
      //TODO verify certificate here
      let server_random = base64ToArrayBuffer(server_hello["server_random"]);
      let uuid = server_hello["shttp_uuid"];
      let key = await window.crypto.subtle.generateKey(
        {
          name: "ECDH",
          namedCurve: "P-256",
        },
        true,
        ["deriveKey", "deriveBits"]
      );
      let pubkey = await window.crypto.subtle.exportKey("spki", key.publicKey);
      var pubkey64 = window.btoa(
        new Uint8Array(pubkey).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      resp = await this.$http.post(
        this.negotiateURL,
        {
          client_pub_key: pubkey64,
        },
        { headers: { "SHTTP-UUID": uuid } }
      );
      //   console.log(resp.data);
      //TODO check sign here
      let server_pub_key = base64ToArrayBuffer(resp.data["server_pub_key"]);
      let spbk = await window.crypto.subtle.importKey(
        "spki",
        server_pub_key,
        {
          name: "ECDH",
          namedCurve: "P-256",
        },
        false,
        []
      );
      let shared_secret = await window.crypto.subtle.deriveBits(
        {
          name: "ECDH",
          namedCurve: "P-256",
          public: spbk,
        },
        key.privateKey,
        256
      );
      let tmp = new Uint8Array(
        client_random.length +
          server_random.byteLength +
          shared_secret.byteLength
      );
      //   console.log(client_random);
      //   console.log(shared_secret);
      //   console.log(server_random);
      tmp.set(client_random, 0);
      tmp.set(new Uint8Array(shared_secret), client_random.length);
      tmp.set(
        new Uint8Array(server_random),
        client_random.length + shared_secret.byteLength
      );
      let real_secret = await window.crypto.subtle.digest(
        {
          name: "SHA-256",
        },
        tmp
      );
      //   console.log(tmp);
      //   console.log(new Uint8Array(real_secret));

      this.uuid = uuid;
      this.aes_secret = new Uint8Array(real_secret.slice(0, 16));
    },
    //data是string
    async post(url, data) {
      //如果第一次创建就进行秘钥协商
      if (this.aes_secret == undefined) {
        //TODO 这里事实上需要判断返回值，给出服务器签名是否安全
        await this.negotiateSecret();
      }

      let try_negotimes = 0;

      do {
        let aeskey = await window.crypto.subtle.importKey(
          "raw",
          this.aes_secret,
          {
            name: "AES-GCM",
          },
          false,
          ["encrypt", "decrypt"]
        );
        let tenc = new TextEncoder();
        let iv = window.crypto.getRandomValues(new Uint8Array(12));
        let aad = tenc.encode(this.uuid);
        let cipher_data = await window.crypto.subtle.encrypt(
          {
            name: "AES-GCM",
            iv: iv,
            additionalData: aad,
            tagLength: 128,
          },
          aeskey,
          tenc.encode(data)
        );
        let tmp = new Uint8Array(iv.byteLength + cipher_data.byteLength);
        tmp.set(new Uint8Array(iv), 0);
        tmp.set(new Uint8Array(cipher_data), iv.byteLength);
        let recv = await this.axios.request({
          url: url,
          method: "post",
          data: tmp,
          headers: { "SHTTP-UUID": this.uuid },
          responseType: "arraybuffer",
        });
        if (recv.status == 280) {
          if (try_negotimes == 3) {
            break;
          }
          await this.negotiateSecret();
          //   console.log("renegotiate");
          try_negotimes += 1;
          continue;
        }
        let plain_text = await window.crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: recv.data.slice(0, 12),
            additionalData: aad,
            tagLength: 128,
          },
          aeskey,
          recv.data.slice(12, recv.data.byteLength)
        );
        let tdec = new TextDecoder();
        recv.data = tdec.decode(plain_text);
        // console.log(recv);
        return recv;
      // eslint-disable-next-line no-constant-condition
      } while (true);
    },
    output() {
      console.log(this.uuid);
      console.log(this.aes_secret);
      console.log(this.negotiateURL);
    },
  },
};
</script>
