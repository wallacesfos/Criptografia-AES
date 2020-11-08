const crypto = require('crypto');
const rs = require('readline-sync')

const senha = 'abcabcabcabcabcabcabcabc';
const bytees = crypto.randomBytes(12);
const buffzinho = Buffer.from('0123456789', 'hex');

const cipher = crypto.createCipheriv('aes-192-ccm', senha, bytees, {
  authTagLength: 16
});
const plaintext = rs.question('Insira a senha que vai ser Criptografada: ');
cipher.setAAD(buffzinho, {
  plaintextLength: Buffer.byteLength(plaintext)
});
const cripfinal = cipher.update(plaintext, 'utf8');
cipher.final();
const tag = cipher.getAuthTag();
console.log(cripfinal)

// DESCRIPTOGRAFIA 

let pergunta = rs.question('você quer que descriptografe? Y/N: ')

if(pergunta == 'Y'){
   const descriptografia = crypto.createDecipheriv('aes-192-ccm', senha, bytees, {
        authTagLength: 16
    });
    descriptografia.setAuthTag(tag);
    descriptografia.setAAD(buffzinho, {
        plaintextLength: cripfinal.length
    });
    const descriptografando = descriptografia.update(cripfinal, null, 'utf8');
    try {
        descriptografia.final();
      } catch (err) {
        console.error('Falha na Autenticação!');
        return;
      }
      console.log(descriptografando);
}if(pergunta == 'N'){
    console.log('Programa encerrado')
}
