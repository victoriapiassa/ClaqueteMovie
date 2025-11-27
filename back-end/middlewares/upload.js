import multer from "multer";

 /**
* Ela funciona como um middleware do node.js, ou seja, fica no meio do caminho entre a requisição do usuário e o seu 
* controller,
* permitindo que você receba imagens, PDFs, vídeos, áudios ou qualquer arquivo enviado através de um formulário.
*/


    /**
    * DiskStorage() é uma função que permite configurar como e onde os arquivos enviados pelo usuário serão salvos no 
    * disco do servidor
    */
 const storagePhoto = multer.diskStorage({


    /**
    * Função responsavel por direcionar a onde o arquivo vai ser salvo 
    */
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // pasta onde a imagem será salva
  },

  /**
   *  Isso cria um nome único, evitando conflitos de arquivos com o mesmo nome.
   */
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

export const upload = multer({ storagePhoto });