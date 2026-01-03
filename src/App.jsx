// import { useEffect, useRef, useState } from "react";

// export default function App() {
//   const localVideo = useRef(null);
//   const remoteVideo = useRef(null);
//   const peerRef = useRef(null);
//   const socketRef = useRef(null);

//   const [joined, setJoined] = useState(false);

//   useEffect(() => {
//     socketRef.current = new WebSocket("ws://localhost:5000");

//     socketRef.current.onmessage = async (event) => {
//       const data = JSON.parse(event.data);

//       if (data.type === "user-joined") {
//         createOffer();
//       }

//       if (data.type === "signal") {
//         const signal = data.payload;

//         if (signal?.sdp) {
//           await peerRef.current.setRemoteDescription(signal);

//           if (signal.type === "offer") {
//             const answer = await peerRef.current.createAnswer();
//             await peerRef.current.setLocalDescription(answer);

//             socketRef.current.send(
//               JSON.stringify({
//                 type: "signal",
//                 roomId: "room1",
//                 payload: answer,
//               })
//             );
//           }
//         }

//         if (signal?.candidate) {
//           await peerRef.current.addIceCandidate(signal.candidate);
//         }
//       }
//     };

//     return () => socketRef.current?.close();
//   }, []);

//   const startCall = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });

//     localVideo.current.srcObject = stream;

//     peerRef.current = new RTCPeerConnection();

//     stream.getTracks().forEach((track) => {
//       peerRef.current.addTrack(track, stream);
//     });

//     peerRef.current.ontrack = (e) => {
//       remoteVideo.current.srcObject = e.streams[0];
//     };

//     peerRef.current.onicecandidate = (e) => {
//       if (e.candidate) {
//         socketRef.current.send(
//           JSON.stringify({
//             type: "signal",
//             roomId: "room1",
//             payload: { candidate: e.candidate },
//           })
//         );
//       }
//     };

//     socketRef.current.send(
//       JSON.stringify({ type: "join", roomId: "room1" })
//     );

//     setJoined(true);
//   };

//   const createOffer = async () => {
//     const offer = await peerRef.current.createOffer();
//     await peerRef.current.setLocalDescription(offer);

//     socketRef.current.send(
//       JSON.stringify({
//         type: "signal",
//         roomId: "room1",
//         payload: offer,
//       })
//     );
//   };

//   return (
//     <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6">
//       <h1 className="text-3xl font-bold">WebSocket Video Call</h1>

//       <div className="flex gap-6">
//         <video
//           ref={localVideo}
//           autoPlay
//           muted
//           className="w-64 h-48 rounded-lg border"
//         />
//         <video
//           ref={remoteVideo}
//           autoPlay
//           className="w-64 h-48 rounded-lg border"
//         />
//       </div>

//       {!joined && (
//         <button
//           onClick={startCall}
//           className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
//         >
//           Join Call
//         </button>
//       )}
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";

export default function App() {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const peerRef = useRef(null);
  const socketRef = useRef(null);

  const [joined, setJoined] = useState(false);

  useEffect(() => {
    socketRef.current = new WebSocket(import.meta.env.VITE_WS_URL);

    socketRef.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "user-joined") {
        createOffer();
      }

      if (data.type === "signal") {
        const signal = data.payload;

        if (signal?.sdp) {
          await peerRef.current.setRemoteDescription(signal);
          if (signal.type === "offer") {
            const answer = await peerRef.current.createAnswer();
            await peerRef.current.setLocalDescription(answer);
            socketRef.current.send(JSON.stringify({
              type: "signal",
              roomId: "room1",
              payload: answer
            }));
          }
        }

        if (signal?.candidate) {
          await peerRef.current.addIceCandidate(signal.candidate);
        }
      }
    };

    return () => socketRef.current?.close();
  }, []);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.current.srcObject = stream;

    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    stream.getTracks().forEach(track =>
      peerRef.current.addTrack(track, stream)
    );

    peerRef.current.ontrack = (e) => {
      remoteVideo.current.srcObject = e.streams[0];
    };

    peerRef.current.onicecandidate = (e) => {
      if (e.candidate) {
        socketRef.current.send(JSON.stringify({
          type: "signal",
          roomId: "room1",
          payload: { candidate: e.candidate }
        }));
      }
    };

    socketRef.current.send(JSON.stringify({
      type: "join",
      roomId: "room1"
    }));

    setJoined(true);
  };

  const createOffer = async () => {
    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);

    socketRef.current.send(JSON.stringify({
      type: "signal",
      roomId: "room1",
      payload: offer
    }));
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Video Call App</h1>

      <div className="flex gap-6">
        <video ref={localVideo} autoPlay muted className="w-64 rounded border" />
        <video ref={remoteVideo} autoPlay className="w-64 rounded border" />
      </div>

      {!joined && (
        <button
          onClick={startCall}
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700"
        >
          Join Call
        </button>
      )}
    </div>
  );
}
