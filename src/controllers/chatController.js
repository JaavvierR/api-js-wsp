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
                    "1": "Disponemos de las siguientes categorías de productos:\n- 📱 Electrónica (smartphones, laptops, accesorios)\n- 👗 Ropa y moda\n- 🏠 Hogar y cocina",
                    "2": "🔥 ¡Ofertas especiales disponibles! 🔥\n- 🛒 30% de descuento en electrónica\n- 🚚 Envío gratis en compras mayores a $50",
                    "3": "📦 Métodos de envío:\n- 🚛 Estándar (3-5 días hábiles)\n- ⚡ Express (1-2 días con costo adicional)"
                },
                despedida: "🤖 ¡Gracias por tu consulta! 😊 Que tengas un día increíble.",
                error: "⚠️ Opción inválida. Por favor, selecciona una opción del menú."
            });

            await chatData.save();
        }

        // 🔹 Agregamos botones dinámicos
        const botones = [
            { id: "1", text: "Consultar productos" },
            { id: "2", text: "Ofertas especiales" },
            { id: "3", text: "Información de envíos" }
        ];

        res.json({
            bienvenida: chatData.bienvenida,
            menu: chatData.menu.join("\n"), // Manteniendo el menú como texto plano
            botones, // Enviamos los botones como parte de la respuesta JSON
            despedida: chatData.despedida,
            error: chatData.error
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Manejo de mensajes enviados por el bot
exports.handleMessage = async (req, res) => {
    try {
        const { from, selectedOption } = req.body;
        let chatData = await Chat.findOne();

        if (!chatData) {
            return res.status(404).json({ message: "Chat data not found" });
        }

        const responseMessage = chatData.respuestas[selectedOption] || chatData.error;
        res.json({ from, message: responseMessage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
