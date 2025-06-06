require("dotenv").config();
const { Groq } = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Configuraciones de comportamiento basado en palabras clave
const behaviors = {
  plan_accion: {
    systemPrompt: `Eres un consultor experto en gestión empresarial especializado en generar planes de acción inmediatos para indicadores clave de desempeño (KPIs) cuando fallan.  
    Al crear un plan de acción:  
    1. Analiza el contexto del KPI proporcionado, incluyendo su información y las veces que ha fallado.  
    2. Genera un plan detallado y práctico con objetivos específicos basados en el principio SMART.  
    3. Define acciones concretas y secuenciales que puedan ejecutarse de inmediato.  
    4. Incluye métricas de seguimiento para medir el éxito de las acciones.  
    5. Establece una fecha límite clara para la ejecución de todas las tareas propuestas.  
    6. No realices análisis de causa raíz; enfócate exclusivamente en una respuesta rápida y eficaz.  
    Formato: Usa texto plano y directo, evitando cualquier formato innecesario.  
    Tono: Profesional, enfocado en soluciones y orientado a resultados.  
    Idioma: Español empresarial.`,
    temperature: 0.7,
    maxTokens: 2000,
  },

  analisis_detalle: {
    systemPrompt: `Eres un analista de datos especializado en KPIs empresariales.
        Tu función es:
        1. Analizar métricas y tendencias
        2. Identificar patrones y anomalías
        3. Proporcionar insights actionables
        4. Sugerir mejoras y optimizaciones
        5. Explicar las implicaciones de los datos
        Formato: Análisis estructurado con conclusiones claras.
        Tono: Analítico pero comprensible.
        Idioma: Español técnico pero accesible.`,
    temperature: 0.5,
    maxTokens: 1500,
  },

  salida_no_conforme: {
    systemPrompt: `Eres un especialista en control de calidad y gestión de no conformidades.
        Cuando analices salidas no conformes:
        1. Identifica las causas raíz
        2. Evalúa el impacto
        3. Propone acciones correctivas inmediatas
        4. Sugiere acciones preventivas
        5. Define plan de seguimiento
        Formato: Estructura clara con prioridades.
        Tono: Urgente pero constructivo.
        Idioma: Español profesional.`,
    temperature: 0.3,
    maxTokens: 2500,
  },
};

// Función principal para obtener comportamiento y generar respuesta
async function processWithBehavior(behaviorKey, userMessage) {
  try {
    // Verificar si existe el comportamiento
    if (!behaviors[behaviorKey]) {
      throw new Error(
        `Comportamiento '${behaviorKey}' no encontrado. Disponibles: ${Object.keys(
          behaviors
        ).join(", ")}`
      );
    }

    const behavior = behaviors[behaviorKey];

    // Configurar mensajes con el comportamiento específico
    const messages = [
      {
        role: "system",
        content: behavior.systemPrompt,
      },
      {
        role: "user",
        content: userMessage,
      },
    ];

    // Crear la completion con configuración específica
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "meta-llama/llama-3.1-70b-versatile", // Modelo más estable
      temperature: behavior.temperature,
      max_completion_tokens: behavior.maxTokens,
      top_p: 1,
      stream: true,
      stop: null,
    });

    // Procesar respuesta streaming
    let fullResponse = "";
    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullResponse += content;
      process.stdout.write(content);
    }

    return {
      success: true,
      behavior: behaviorKey,
      response: fullResponse.trim(),
      config: {
        temperature: behavior.temperature,
        maxTokens: behavior.maxTokens,
      },
    };
  } catch (error) {
    console.error("Error procesando solicitud:", error.message);
    return {
      success: false,
      error: error.message,
      behavior: behaviorKey,
    };
  }
}

// Función para respuesta streaming
async function processMessageStream(behaviorKey, userMessage) {
  try {
    if (!behaviors[behaviorKey]) {
      throw new Error(`Comportamiento '${behaviorKey}' no encontrado`);
    }

    const behavior = behaviors[behaviorKey];

    const messages = [
      {
        role: "system",
        content: behavior.systemPrompt,
      },
      {
        role: "user",
        content: userMessage,
      },
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.3-70b-versatile",
      temperature: behavior.temperature,
      max_completion_tokens: behavior.maxTokens,
      top_p: 1,
      stream: true,
      stop: null,
    });

    // Procesar respuesta streaming
    let fullResponse = "";
    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullResponse += content;
      process.stdout.write(content);
    }

    return {
      success: true,
      response: fullResponse.trim(),
      behavior: behaviorKey,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      behavior: behaviorKey,
    };
  }
}

// Función principal: recibe comportamiento desde el frontend
async function processMessage(behaviorKey, userMessage) {
  try {
    // Verificar si existe el comportamiento
    if (!behaviors[behaviorKey]) {
      throw new Error(
        `Comportamiento '${behaviorKey}' no encontrado. Disponibles: ${Object.keys(
          behaviors
        ).join(", ")}`
      );
    }

    const behavior = behaviors[behaviorKey];

    // Configurar mensajes con el comportamiento específico
    const messages = [
      {
        role: "system",
        content: behavior.systemPrompt,
      },
      {
        role: "user",
        content: userMessage,
      },
    ];

    // Crear la completion con configuración específica
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.3-70b-versatile",
      temperature: behavior.temperature,
      max_completion_tokens: behavior.maxTokens,
      top_p: 1,
      stream: false,
    });

    return {
      success: true,
      response: chatCompletion.choices[0].message.content.trim(),
      behavior: behaviorKey,
      usage: chatCompletion.usage,
    };
  } catch (error) {
    console.error("Error procesando solicitud:", error.message);
    return {
      success: false,
      error: error.message,
      behavior: behaviorKey,
    };
  }
}

// Exportar funciones
module.exports = {
  processMessage,
  processMessageStream,
};

async function ejemplo() {
  console.log("=== ejemplo de uso ===");

  // usar comportamiento especifico enviado desde el frontend
  const resultado = await processMessage(
    "plan_accion",
    "El KPI tiempo promedio de respuesta ha fallado 1 veces, este indicador se encarga de Promedio de tiempo que toma a un agente responder una llamada o consulta desde que es recibida. tiene una meta de 30 segundos, su formula de medición Total de tiempo de espera / Número de llamadas"
  );

  if (resultado.success) {
    console.log("\n=== Respuesta generada ===");
    console.log(`Comportamiento usado: ${resultado.behavior}`);
    console.log(`Respuesta: ${resultado.response}`);
    console.log(`Tokens usados: ${resultado.usage?.total_tokens || "N/A"}`);
  } else {
    console.log("Error:", resultado.error);
  }
}

// ejemplo();
