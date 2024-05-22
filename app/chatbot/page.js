"use client";
import React, { useState, useEffect, useRef } from "react";
import parse from 'html-react-parser';

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { obtenerDeudas } from "../firebase/firestore/getDeudas";
import { obtenerObjetivos } from "../firebase/firestore/getObjetives";
import { obtenerTransacciones } from "../firebase/firestore/getTransaction";
import { obtenerUsuario } from "../firebase/auth/currentSesion";
import { useUser } from "../customHooks/UserContext";
import { getUserProfile } from "../firebase/firestore/getProfileFromDb";
import { useRouter } from "next/navigation";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState(null);
  const { userProfile, setUserProfile } = useUser();
  const [objetivos, setObjetivos] = useState([]);
  const [transacciones, setTransacciones] = useState([]);
  const [deudas, setDeudas] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    { role: "user", parts: [{ text: "Hola Finet, necesito que me asistas en mis solicitudes financieras\n" }] },
    {
      role: "model",
      parts: [
        { text: "Claro, ¿en qué te puedo asistir hoy? 😊 \n" },
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);

  const apiKey = "AIzaSyD3clbXIoxJ0U34wfs7nr5D61RFSckDOiQ"; // Coloca tu API Key aquí
  const chatSessionRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await obtenerUsuario();
      if (!user) {
        router.push('/login');
      } else {
        setUserData(user);

        obtenerTransacciones(user.uid, (transaccionesData) => {
          setTransacciones(transaccionesData);
        });



        obtenerObjetivos(user.uid, (objetivosData) => {
          setObjetivos(objetivosData);
        });

        obtenerDeudas(user.uid, (deudaData) => {
          setDeudas(deudaData);
        });

        const userProfileFromFirestore = await getUserProfile(user.uid);
        setUserProfile(userProfileFromFirestore);
      }
    };

    fetchUserData();
  }, [router, setUserProfile]);


  useEffect(() => {

    const formatTransacciones = (transacciones) => {
      return transacciones.map((transaccion, index) => {
        return `Transacción ${index + 1}:
          - Descripción: ${transaccion.descripcion}
          - Monto: ${transaccion.importe}
          - Fecha: ${transaccion.fecha}
          - Categoria: ${transaccion.categoria}
        `;
      }).join("\n");
    };

    const initializeChatSession = async () => {
      if (userProfile && userData) {
        console.log(transacciones)
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-pro-latest",
          systemInstruction: `Eres un asistente financiero, te llamas finet y tienes que responder solo a preguntas en el área de las finanzas.
          
          quiero que tus respuestas sean en formato HTML, usa las etiquetas necesarias segun la respuesta, quiero le des prioridad a ciertas palabras y las hagas diferenciar con diferentes etiquetas, todas las etiquetas deben tener algun estilo con estilos en linea, tienes totalmente prohibido enviar alguna respuesta que pueda romper la interfaz o la aplicacion.

          Las principales preguntas a las que responderás serán sobre las finanzas personales del usuario, eso incluye
          las deudas, los objetivos y sus últimos movimientos.
          
          Aquí tienes el balance actual del usuario ${userProfile.balance_general},
          Aquí tienes el nombre del usuario ${userData.displayName},
          aquí tienes el email del usuario ${userData.email},
          Aqui tienes las ultima transaccion del usuario ${formatTransacciones(transacciones)}
          `
        });

        const generationConfig = {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        };

        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ];

        chatSessionRef.current = model.startChat({
          generationConfig,
          safetySettings,
          history: chatHistory,
        });
      }
    };

    initializeChatSession();
  }, [userProfile, userData, chatHistory]); // Dependencia en userProfile y userData

  const sendMessage = async () => {
    if (!chatSessionRef.current) return;

    const userMessage = { role: "user", parts: [{ text: userInput + "\n" }] };
    setChatHistory((prevChatHistory) => [...prevChatHistory, userMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage(userInput);
      const modelMessage = { role: "model", parts: [{ text: result.response.text() + "\n" }] };

      setChatHistory((prevChatHistory) => [...prevChatHistory, modelMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-grow overflow-y-auto mb-4">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded-lg ${message.role === "user"
                ? "bg-azulMarino text-white"
                : "bg-gray-200 text-gray-800"}`}
            >
              {parse(message.parts[0].text)}
              {console.log(message.parts[0].text)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="p-2 rounded-lg bg-gray-200 text-gray-800">
              Escribiendo...
            </div>
          </div>
        )}
      </div>
      <div className="flex mb-[70px]">
        <textarea
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="flex-grow p-2 border rounded-l-lg"
          placeholder="Escribe tu mensaje..."
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-azulMarino text-white rounded-r-lg"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
