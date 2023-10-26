//@param {String} email: es el email al que se le envia un correo
//@param {String} asunto: es el asunto del mensaje
//@param {String} cuerpo: es el cuerpo del mensaje a enviar

const enviarEmail = (email = "", asunto = "", cuerpo = "") => {
  try {
    //si inserto correctamente entonces enviar mensaje a email
    //enviar correos electronicos
    GmailApp.sendEmail(email, asunto, "", {
      htmlBody: `<!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="utf-8" />
          <title>Plantilla</title>
        </head>
        <body>
          <table
            style="
              max-width: 600px;
              padding: 10px;
              margin: 0 auto;
              border-collapse: collapse;
            "
          >
            <tr>
              <td style="background-color:#ffdc5d; text-align: left;display: flex;">
              <div style="width: 50%">
                <img
                  src="https://raw.githubusercontent.com/ESAGOBOLIVAR/recursos-de-imagenes/Logo-Servicios-Bolivar/Logo%20Servicios%20Bolivar.jpeg"
                  style="width: 100%"
                />
              </div>
              <div style="width: 28%">
                <img
                  src="https://raw.githubusercontent.com/ESAGOBOLIVAR/recursos-de-imagenes/logo-esago/Esago-Logo.png"
                  style="width: 100%"
                />
              </div>
             </td>
            </tr>
            ${cuerpo}
          </table>
        </body>
      </html>
        `,
      noReply: true,
    });

    return JSON.stringify("success");
  } catch (e) {
    return JSON.stringify("error");
  }
};




