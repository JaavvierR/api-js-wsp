const Chat = require('../models/Chat');

exports.getChat = async (req, res) => {
  try {
    let chatData = await Chat.findOne();

    if (!chatData) {
      chatData = new Chat({
        bienvenida: "✨ ¡Bienvenido al Asistente de Ventas! ✨\n🛍️ Estoy aquí para ayudarte a…",
        menu: [
          "1️⃣ Consultar productos",
          "2️⃣ Ofertas especiales",
          "3️⃣ Información de envíos",
          "4️⃣ Otros (realizar pregunta personalizada)",
          "5️⃣ Salir"
        ],
        respuestas: {
          "1": "Disponemos de las siguientes categorías de productos:\n- Electrónica (smartphones, laptops, accesorios)\n- Ropa y moda\n- Hogar y cocina",
          "2": "¡Tenemos estas ofertas imperdibles!\n- 30% de descuento en todos los productos electrónicos\n- Envío gratis en compras superiores a $50",
          "3": "Información sobre nuestros envíos:\n- Envío estándar: 3-5 días hábiles\n- Envío express: 1-2 días hábiles con un costo adicional",
        },
        despedida: "🤖 Asistente: ¡Gracias por tu consulta! 😊 Que tengas un día increíble.",
        error: "⚠️ Por favor, selecciona una opción válida  (1-5)."
      });

      await chatData.save();
    } 

    res.json(chatData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
