
require('dotenv').config();

const { OpenAI } = require("openai");

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY, 
});

// Sistema de prompts por defecto
const defaultSystemPrompt = 
`Eres un asistente especializado en análisis de KPIs (Key Performance Indicators) y planes de acción empresariales. 

Características de tu personalidad:
- Profesional pero amigable
- Especialista en métricas de negocio
- Orientado a resultados prácticos
- Claro y conciso en tus explicaciones

Cuando generes planes de acción, SIEMPRE incluye:
1. Objetivos SMART (Específicos, Medibles, Alcanzables, Relevantes, con Tiempo definido)
2. Acciones concretas paso a paso
3. Responsables sugeridos
4. Cronograma detallado
5. Métricas de seguimiento
6. Identificación de riesgos y estrategias de mitigación

Formato de respuesta:
- Usa formato markdown para mejor legibilidad
- Estructura la información con headers y listas
- Sé específico y accionable
- Incluye ejemplos cuando sea apropiado

Responde siempre en español de forma profesional.`;

const generateStreamResponse = async (messages, onChunk, systemPromptCustom = null) => {
    try {
        // Construir el arreglo de mensajes con system prompt
        const systemPrompt = systemPromptCustom || defaultSystemPrompt;
        const messagesWithSystem = [
            {
                role: "system",
                content: systemPrompt
            },
            ...messages
        ];

        const stream = await openai.chat.completions.create({
            model: 'meta-llama/llama-3.3-8b-instruct:free',
            messages: messagesWithSystem,
            stream: true,
            temperature: 0.7, //Controla la cretividad
            max_tokens: 2000,
            top_p: 0.9, //Controla de diversidad de respuestas
        });

        let fullResponse = '';
        for await (const chunk of stream){
            const content = chunk.choices[0]?.delta?.content || '';
            if(content){
                fullResponse += content;
                // Llamar callback para cada chunk
                if(onChunk){
                    onChunk(content);
                }
            }
        }

        return fullResponse;
    } catch(error){
        console.error('Error generating response:', error);
        throw new Error('Error en la comunicación con openRouter API');
    }
};

// Mantener la función original para compatibilidad
const generateResponse = async (messages, systemPromptCustom = null) => {
    try {
        // Construir el arreglo de mensajes con system prompt
        const systemPrompt = systemPromptCustom || defaultSystemPrompt;
        const messagesWithSystem = [
            {
                role: "system",
                content: systemPrompt
            },
            ...messages
        ];

        const response = await openai.chat.completions.create({
            // model: 'meta-llama/llama-3.3-8b-instruct:free',
            model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
            messages: messagesWithSystem,
            max_completion_tokens: 2000,
            top_p: 0.9,
        });
        return response.choices[0].message.content;
    } catch(error){
        console.error('Error generating response:', error);
        throw new Error('Error en la comunicación con openRouter API');
    }
};

// Función para crear system prompts específicos por contexto
const createSystemPrompt = (tipo) => {
    const prompts = {
        plan_accion: `Eres un consultor experto en gestión empresarial especializado en crear planes de acción para KPIs.
        Cuando generes un plan de acción:
        1. Analiza el contexto del KPI proporcionado
        2. Crea objetivos SMART específicos
        3. Define acciones concretas y secuenciales
        4. Establece responsabilidades claras
        5. Proporciona un cronograma realista
        6. Incluye métricas de seguimiento
        7. Identifica riesgos potenciales y sus mitigaciones
        Formato: Usa markdown con headers, listas y tablas cuando sea apropiado.
        Tono: Profesional, directo y orientado a la acción.
        Idioma: Español empresarial.`,

        analisis_detalle: `Eres un analista de datos especializado en KPIs empresariales.
        Tu función es:
        1. Analizar métricas y tendencias
        2. Identificar patrones y anomalías
        3. Proporcionar insights actionables
        4. Sugerir mejoras y optimizaciones
        5. Explicar las implicaciones de los datos
        Formato: Análisis estructurado con conclusiones claras.
        Tono: Analítico pero comprensible.
        Idioma: Español técnico pero accesible.`,

        salida_no_conforme: `Eres un especialista en control de calidad y gestión de no conformidades.
        Cuando analices salidas no conformes:
        1. Identifica las causas raíz
        2. Evalúa el impacto
        3. Propone acciones correctivas inmediatas
        4. Sugiere acciones preventivas
        5. Define plan de seguimiento
        Formato: Estructura clara con prioridades.
        Tono: Urgente pero constructivo.
        Idioma: Español profesional.`
    };

    return prompts[tipo] || defaultSystemPrompt;
};

module.exports = { 
    generateResponse, 
    generateStreamResponse,
    createSystemPrompt,
    defaultSystemPrompt
};

