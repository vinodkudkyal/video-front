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



// import { useEffect, useRef, useState } from "react";

// export default function App() {
//   const localVideo = useRef(null);
//   const remoteVideo = useRef(null);
//   const peerRef = useRef(null);
//   const socketRef = useRef(null);

//   const [joined, setJoined] = useState(false);

//   useEffect(() => {
//     socketRef.current = new WebSocket(import.meta.env.VITE_WS_URL);

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
//             socketRef.current.send(JSON.stringify({
//               type: "signal",
//               roomId: "room1",
//               payload: answer
//             }));
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
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     localVideo.current.srcObject = stream;

//     peerRef.current = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
//     });

//     stream.getTracks().forEach(track =>
//       peerRef.current.addTrack(track, stream)
//     );

//     peerRef.current.ontrack = (e) => {
//       remoteVideo.current.srcObject = e.streams[0];
//     };

//     peerRef.current.onicecandidate = (e) => {
//       if (e.candidate) {
//         socketRef.current.send(JSON.stringify({
//           type: "signal",
//           roomId: "room1",
//           payload: { candidate: e.candidate }
//         }));
//       }
//     };

//     socketRef.current.send(JSON.stringify({
//       type: "join",
//       roomId: "room1"
//     }));

//     setJoined(true);
//   };

//   const createOffer = async () => {
//     const offer = await peerRef.current.createOffer();
//     await peerRef.current.setLocalDescription(offer);

//     socketRef.current.send(JSON.stringify({
//       type: "signal",
//       roomId: "room1",
//       payload: offer
//     }));
//   };

//   return (
//     <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6">
//       <h1 className="text-3xl font-bold">Video Call App</h1>

//       <div className="flex gap-6">
//         <video ref={localVideo} autoPlay muted className="w-64 rounded border" />
//         <video ref={remoteVideo} autoPlay className="w-64 rounded border" />
//       </div>

//       {!joined && (
//         <button
//           onClick={startCall}
//           className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700"
//         >
//           Join Call
//         </button>
//       )}
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";

const ICE = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

export default function App() {
  const localVideo = useRef();
  const socketRef = useRef();
  const peersRef = useRef({});

  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [remoteStreams, setRemoteStreams] = useState([]);

  useEffect(() => {
    socketRef.current = new WebSocket(import.meta.env.VITE_WS_URL);

    socketRef.current.onmessage = async (e) => {
      const { type, payload } = JSON.parse(e.data);

      if (type === "new-user") {
        createOffer();
      }

      if (type === "signal") {
        handleSignal(payload);
      }
    };

    return () => socketRef.current?.close();
  }, []);

  const joinRoom = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.current.srcObject = stream;

    socketRef.current.send(JSON.stringify({
      type: "join",
      roomId
    }));

    setJoined(true);
  };

  const createPeer = (id) => {
    const peer = new RTCPeerConnection(ICE);

    localVideo.current.srcObject.getTracks().forEach(track =>
      peer.addTrack(track, localVideo.current.srcObject)
    );

    peer.ontrack = (e) => {
      setRemoteStreams(prev => [...prev, e.streams[0]]);
    };

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        socketRef.current.send(JSON.stringify({
          type: "signal",
          roomId,
          payload: { candidate: e.candidate }
        }));
      }
    };

    peersRef.current[id] = peer;
    return peer;
  };

  const createOffer = async () => {
    const peer = createPeer();
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    socketRef.current.send(JSON.stringify({
      type: "signal",
      roomId,
      payload: offer
    }));
  };

  const handleSignal = async (signal) => {
    let peer = peersRef.current["peer"];
    if (!peer) peer = createPeer("peer");

    if (signal.sdp) {
      await peer.setRemoteDescription(signal);
      if (signal.type === "offer") {
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socketRef.current.send(JSON.stringify({
          type: "signal",
          roomId,
          payload: answer
        }));
      }
    }

    if (signal.candidate) {
      await peer.addIceCandidate(signal.candidate);
    }
  };

  const toggleMute = () => {
    localVideo.current.srcObject.getAudioTracks()[0].enabled = muted;
    setMuted(!muted);
  };

  const toggleCamera = () => {
    localVideo.current.srcObject.getVideoTracks()[0].enabled = cameraOff;
    setCameraOff(!cameraOff);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Group Video Call</h1>

      {!joined && (
        <div className="flex gap-2 justify-center">
          <input
            placeholder="Room ID"
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
            className="px-3 py-2 text-black rounded"
          />
          <button onClick={joinRoom} className="bg-blue-600 px-4 py-2 rounded">
            Join
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <video ref={localVideo} autoPlay muted className="rounded border" />

        {remoteStreams.map((s, i) => (
          <video
            key={i}
            autoPlay
            className="rounded border"
            ref={v => v && (v.srcObject = s)}
          />
        ))}
      </div>

      {joined && (
        <div className="flex justify-center gap-4">
          <button onClick={toggleMute} className="bg-gray-700 px-4 py-2 rounded">
            {muted ? "Unmute" : "Mute"}
          </button>
          <button onClick={toggleCamera} className="bg-gray-700 px-4 py-2 rounded">
            {cameraOff ? "Camera On" : "Camera Off"}
          </button>
        </div>
      )}
    </div>
  );
}
