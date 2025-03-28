const fs = require('fs');
const pdf = require('pdf-parse');
const ollama = require('ollama');

class RagService {
  async processDocument(filePath) {
    try {
      // Lee el archivo PDF
      const dataBuffer = fs.readFileSync(filePath);
      
      // Parsea el PDF
      const data = await pdf(dataBuffer);
      
      // Divide el texto en chunks
      return this.splitText(data.text);
    } catch (error) {
      console.error('Error procesando el PDF:', error);
      throw error;
    }
  }

  splitText(text, chunkSize = 250, overlap = 80) {
    const words = text.split(/\s+/);
    const chunks = [];
    
    for (let i = 0; i < words.length; i += (chunkSize - overlap)) {
      const chunk = words.slice(i, i + chunkSize).join(' ');
      chunks.push(chunk);
    }
    
    return chunks;
  }

  async generateResponse(question, chunks) {
    // Implementa la lógica de búsqueda de contexto relevante
    const relevantChunks = chunks.filter(chunk => 
      chunk.toLowerCase().includes(question.toLowerCase())
    );

    // Si no hay chunks relevantes, usa todos
    const context = relevantChunks.length > 0 ? relevantChunks : chunks;

    // Usa Ollama para generar respuesta
    const response = await ollama.chat({
      model: process.env.OLLAMA_MODEL || 'llama2',
      messages: [
        { 
          role: 'system', 
          content: 'Eres un asistente de ventas amigable y útil.' 
        },
        { 
          role: 'user', 
          content: `Pregunta: ${question}\n\nContexto: ${context.join('\n')}` 
        }
      ]
    });

    return response.message.content;
  }
}

module.exports = new RagService();