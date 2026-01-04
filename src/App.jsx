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



// import { useEffect, useRef, useState } from "react";

// const ICE = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

// export default function App() {
//   const localVideo = useRef();
//   const socketRef = useRef();
//   const peersRef = useRef({});

//   const [roomId, setRoomId] = useState("");
//   const [joined, setJoined] = useState(false);
//   const [muted, setMuted] = useState(false);
//   const [cameraOff, setCameraOff] = useState(false);
//   const [remoteStreams, setRemoteStreams] = useState([]);

//   useEffect(() => {
//     socketRef.current = new WebSocket(import.meta.env.VITE_WS_URL);

//     socketRef.current.onmessage = async (e) => {
//       const { type, payload } = JSON.parse(e.data);

//       if (type === "new-user") {
//         createOffer();
//       }

//       if (type === "signal") {
//         handleSignal(payload);
//       }
//     };

//     return () => socketRef.current?.close();
//   }, []);

//   const joinRoom = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     localVideo.current.srcObject = stream;

//     socketRef.current.send(JSON.stringify({
//       type: "join",
//       roomId
//     }));

//     setJoined(true);
//   };

//   const createPeer = (id) => {
//     const peer = new RTCPeerConnection(ICE);

//     localVideo.current.srcObject.getTracks().forEach(track =>
//       peer.addTrack(track, localVideo.current.srcObject)
//     );

//     peer.ontrack = (e) => {
//       setRemoteStreams(prev => [...prev, e.streams[0]]);
//     };

//     peer.onicecandidate = (e) => {
//       if (e.candidate) {
//         socketRef.current.send(JSON.stringify({
//           type: "signal",
//           roomId,
//           payload: { candidate: e.candidate }
//         }));
//       }
//     };

//     peersRef.current[id] = peer;
//     return peer;
//   };

//   const createOffer = async () => {
//     const peer = createPeer();
//     const offer = await peer.createOffer();
//     await peer.setLocalDescription(offer);

//     socketRef.current.send(JSON.stringify({
//       type: "signal",
//       roomId,
//       payload: offer
//     }));
//   };

//   const handleSignal = async (signal) => {
//     let peer = peersRef.current["peer"];
//     if (!peer) peer = createPeer("peer");

//     if (signal.sdp) {
//       await peer.setRemoteDescription(signal);
//       if (signal.type === "offer") {
//         const answer = await peer.createAnswer();
//         await peer.setLocalDescription(answer);
//         socketRef.current.send(JSON.stringify({
//           type: "signal",
//           roomId,
//           payload: answer
//         }));
//       }
//     }

//     if (signal.candidate) {
//       await peer.addIceCandidate(signal.candidate);
//     }
//   };

//   const toggleMute = () => {
//     localVideo.current.srcObject.getAudioTracks()[0].enabled = muted;
//     setMuted(!muted);
//   };

//   const toggleCamera = () => {
//     localVideo.current.srcObject.getVideoTracks()[0].enabled = cameraOff;
//     setCameraOff(!cameraOff);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col gap-4">
//       <h1 className="text-2xl font-bold text-center">Group Video Call</h1>

//       {!joined && (
//         <div className="flex gap-2 justify-center">
//           <input
//             placeholder="Room ID"
//             value={roomId}
//             onChange={e => setRoomId(e.target.value)}
//             className="px-3 py-2 text-black rounded"
//           />
//           <button onClick={joinRoom} className="bg-blue-600 px-4 py-2 rounded">
//             Join
//           </button>
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//         <video ref={localVideo} autoPlay muted className="rounded border" />

//         {remoteStreams.map((s, i) => (
//           <video
//             key={i}
//             autoPlay
//             className="rounded border"
//             ref={v => v && (v.srcObject = s)}
//           />
//         ))}
//       </div>

//       {joined && (
//         <div className="flex justify-center gap-4">
//           <button onClick={toggleMute} className="bg-gray-700 px-4 py-2 rounded">
//             {muted ? "Unmute" : "Mute"}
//           </button>
//           <button onClick={toggleCamera} className="bg-gray-700 px-4 py-2 rounded">
//             {cameraOff ? "Camera On" : "Camera Off"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useEffect, useRef, useState } from "react";

// const ICE = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

// export default function App() {
//   const socketRef = useRef();
//   const peersRef = useRef({});
//   const localStreamRef = useRef();
//   const localVideoRef = useRef();

//   const [roomId, setRoomId] = useState("");
//   const [joined, setJoined] = useState(false);
//   const [remotes, setRemotes] = useState([]);
//   const [muted, setMuted] = useState(false);
//   const [cameraOff, setCameraOff] = useState(false);

//   useEffect(() => {
//     socketRef.current = new WebSocket(import.meta.env.VITE_WS_URL);

//     socketRef.current.onmessage = async (e) => {
//       const { type, payload } = JSON.parse(e.data);

//       // NEW USER RECEIVES EXISTING USERS → ANSWER ONLY
//       if (type === "existing-users") {
//         payload.forEach(createPeer);
//       }

//       // EXISTING USERS CREATE OFFER FOR NEW USER
//       if (type === "user-joined") {
//         createOffer(payload);
//       }

//       if (type === "signal") {
//         const { from, data } = payload;
//         const peer = peersRef.current[from];

//         if (data.sdp) {
//           await peer.setRemoteDescription(data);
//           if (data.type === "offer") {
//             const answer = await peer.createAnswer();
//             await peer.setLocalDescription(answer);
//             sendSignal(from, answer);
//           }
//         }

//         if (data.candidate) {
//           await peer.addIceCandidate(data.candidate);
//         }
//       }

//       if (type === "user-left") {
//         peersRef.current[payload]?.close();
//         delete peersRef.current[payload];
//         setRemotes((r) => r.filter((x) => x.id !== payload));
//       }
//     };

//     return () => socketRef.current?.close();
//   }, []);

//   const joinRoom = async () => {
//     localStreamRef.current = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });

//     localVideoRef.current.srcObject = localStreamRef.current;

//     socketRef.current.send(
//       JSON.stringify({ type: "join", roomId })
//     );

//     setJoined(true);
//   };

//   const createPeer = (id) => {
//     if (peersRef.current[id]) return peersRef.current[id];

//     const peer = new RTCPeerConnection(ICE);

//     localStreamRef.current.getTracks().forEach((track) =>
//       peer.addTrack(track, localStreamRef.current)
//     );

//     peer.ontrack = (e) => {
//       setRemotes((prev) =>
//         prev.find((p) => p.id === id)
//           ? prev
//           : [...prev, { id, stream: e.streams[0] }]
//       );
//     };

//     peer.onicecandidate = (e) => {
//       if (e.candidate) sendSignal(id, { candidate: e.candidate });
//     };

//     peersRef.current[id] = peer;
//     return peer;
//   };

//   const createOffer = async (id) => {
//     const peer = createPeer(id);
//     const offer = await peer.createOffer();
//     await peer.setLocalDescription(offer);
//     sendSignal(id, offer);
//   };

//   const sendSignal = (target, data) => {
//     socketRef.current.send(
//       JSON.stringify({
//         type: "signal",
//         roomId,
//         payload: { target, data },
//       })
//     );
//   };

//   const toggleMute = () => {
//     localStreamRef.current.getAudioTracks()[0].enabled = muted;
//     setMuted(!muted);
//   };

//   const toggleCamera = () => {
//     localStreamRef.current.getVideoTracks()[0].enabled = cameraOff;
//     setCameraOff(!cameraOff);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4">
//       <h1 className="text-xl font-bold text-center mb-4">
//         Group Video Call
//       </h1>

//       {!joined && (
//         <div className="flex gap-2 justify-center mb-4">
//           <input
//             className="px-3 py-2 text-black rounded"
//             placeholder="Room ID"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//           />
//           <button
//             onClick={joinRoom}
//             className="bg-blue-600 px-4 py-2 rounded"
//           >
//             Join
//           </button>
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           className="rounded border"
//         />

//         {remotes.map(({ id, stream }) => (
//           <video
//             key={id}
//             autoPlay
//             className="rounded border"
//             ref={(v) => v && (v.srcObject = stream)}
//           />
//         ))}
//       </div>

//       {joined && (
//         <div className="flex justify-center gap-4 mt-4">
//           <button onClick={toggleMute} className="bg-gray-700 px-4 py-2 rounded">
//             {muted ? "Unmute" : "Mute"}
//           </button>
//           <button
//             onClick={toggleCamera}
//             className="bg-gray-700 px-4 py-2 rounded"
//           >
//             {cameraOff ? "Camera On" : "Camera Off"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }




// import { useEffect, useRef } from "react";
// import io from "socket.io-client";

// const socket = io("https://video-back-r29x.onrender.com");

// const ROOM_ID = "demo-room";

// export default function App() {
//   const localVideo = useRef();
//   const remoteVideo = useRef();
//   const pc = useRef(null);

//   useEffect(() => {
//     socket.emit("join-room", ROOM_ID);

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideo.current.srcObject = stream;

//         pc.current = new RTCPeerConnection({
//           iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
//         });

//         stream.getTracks().forEach(track =>
//           pc.current.addTrack(track, stream)
//         );

//         pc.current.ontrack = (e) => {
//           remoteVideo.current.srcObject = e.streams[0];
//         };

//         pc.current.onicecandidate = (e) => {
//           if (e.candidate) {
//             socket.emit("ice-candidate", {
//               roomId: ROOM_ID,
//               candidate: e.candidate
//             });
//           }
//         };
//       });

//     socket.on("user-joined", async () => {
//       const offer = await pc.current.createOffer();
//       await pc.current.setLocalDescription(offer);
//       socket.emit("offer", { roomId: ROOM_ID, offer });
//     });

//     socket.on("offer", async (offer) => {
//       await pc.current.setRemoteDescription(offer);
//       const answer = await pc.current.createAnswer();
//       await pc.current.setLocalDescription(answer);
//       socket.emit("answer", { roomId: ROOM_ID, answer });
//     });

//     socket.on("answer", (answer) => {
//       pc.current.setRemoteDescription(answer);
//     });

//     socket.on("ice-candidate", (candidate) => {
//       pc.current.addIceCandidate(candidate);
//     });
//   }, []);

//   return (
//     <div style={{ display: "flex", gap: 20, padding: 20 }}>
//       <video ref={localVideo} autoPlay muted width="300" />
//       <video ref={remoteVideo} autoPlay width="300" />
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("https://video-back-r29x.onrender.com", {
  transports: ["websocket"]
});

export default function App() {
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [videos, setVideos] = useState([]);

  const localStream = useRef(null);
  const peers = useRef({});

  const joinCall = async () => {
    if (!name || !passcode) {
      alert("Enter name and passcode");
      return;
    }

    // IMPORTANT: user interaction enables audio
    localStream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    setVideos([
      { id: "me", name, stream: localStream.current }
    ]);

    socket.emit("join-room", {
      roomId: passcode,
      name
    });

    setJoined(true);
  };

  const createPeer = (userId, userName) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    localStream.current.getTracks().forEach(track =>
      pc.addTrack(track, localStream.current)
    );

    pc.ontrack = (e) => {
      setVideos(v =>
        v.some(x => x.id === userId)
          ? v
          : [...v, { id: userId, name: userName, stream: e.streams[0] }]
      );
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", {
          to: userId,
          candidate: e.candidate
        });
      }
    };

    peers.current[userId] = pc;
    return pc;
  };

  useEffect(() => {
    socket.on("all-users", users => {
      users.forEach(async u => {
        if (u.id === socket.id) return;
        const pc = createPeer(u.id, u.name);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("offer", { to: u.id, offer });
      });
    });

    socket.on("user-joined", async ({ id, name }) => {
      const pc = createPeer(id, name);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("offer", { to: id, offer });
    });

    socket.on("offer", async ({ from, offer, name }) => {
      const pc = createPeer(from, name);
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { to: from, answer });
    });

    socket.on("answer", ({ from, answer }) => {
      peers.current[from]?.setRemoteDescription(answer);
    });

    socket.on("ice-candidate", ({ from, candidate }) => {
      peers.current[from]?.addIceCandidate(candidate);
    });

    socket.on("user-left", id => {
      peers.current[id]?.close();
      delete peers.current[id];
      setVideos(v => v.filter(x => x.id !== id));
    });
  }, []);

  if (!joined) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Join Video Call</h2>
        <input placeholder="Your Name" onChange={e => setName(e.target.value)} />
        <br /><br />
        <input placeholder="Passcode" onChange={e => setPasscode(e.target.value)} />
        <br /><br />
        <button onClick={joinCall}>Join Call</button>
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, 250px)",
      gap: 20,
      padding: 20
    }}>
      {videos.map(v => (
        <div key={v.id}>
          <video
            autoPlay
            playsInline
            muted={v.id === "me"}  // IMPORTANT
            ref={el => el && (el.srcObject = v.stream)}
            style={{ width: "100%", borderRadius: 10 }}
          />
          <p style={{ textAlign: "center" }}>{v.name}</p>
        </div>
      ))}
    </div>
  );
}
