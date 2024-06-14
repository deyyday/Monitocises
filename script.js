// demo code for SQUAT DETECTION, is later used as inline js
// let squatCount = 0;
// let wasSquatting = false;
// let isDescending = false;
// let detector;

// async function setupCamera() {
//     const video = document.getElementById('video');
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     video.srcObject = stream;

//     return new Promise((resolve) => {
//         video.onloadedmetadata = () => {
//             resolve(video);
//         };
//     });
// }

// async function setupPoseDetection() {
//     const detectorConfig = {
//         modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
//     };
//     detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
// }

// function isSquatting(pose) {
//     const hip = pose.keypoints.find(point => point.name === 'left_hip' || point.name === 'right_hip');
//     const knee = pose.keypoints.find(point => point.name === 'left_knee' || point.name === 'right_knee');
//     const ankle = pose.keypoints.find(point => point.name === 'left_ankle' || point.name === 'right_ankle');

//     if (hip && knee && ankle) {
//         return hip.y > knee.y && knee.y > ankle.y;
//     }
//     return false;
// }

// function isStanding(pose) {
//     const hip = pose.keypoints.find(point => point.name === 'left_hip' || point.name === 'right_hip');
//     const knee = pose.keypoints.find(point => point.name === 'left_knee' || point.name === 'right_knee');
//     const ankle = pose.keypoints.find(point => point.name === 'left_ankle' || point.name === 'right_ankle');

//     if (hip && knee && ankle) {
//         return hip.y < knee.y && knee.y < ankle.y;
//     }
//     return false;
// }

// async function detectSquats(video, canvas) {
//     const context = canvas.getContext('2d');

//     async function detectFrame() {
//         const poses = await detector.estimatePoses(video);
//         context.clearRect(0, 0, canvas.width, canvas.height);
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);

//         if (poses.length > 0) {
//             const pose = poses[0];
//             const squatting = isSquatting(pose);
//             const standing = isStanding(pose);

//             if (squatting && !wasSquatting && isDescending) {
//                 wasSquatting = true;
//             } else if (standing && wasSquatting) {
//                 squatCount++;
//                 document.getElementById('counter').innerText = `Squats: ${squatCount}`;
//                 wasSquatting = false;
//                 isDescending = false;
//             } else if (!squatting && !standing && !wasSquatting) {
//                 isDescending = true;
//             }

//             // Draw keypoints for debugging
//             pose.keypoints.forEach(point => {
//                 if (point.score > 0.5) {
//                     context.beginPath();
//                     context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
//                     context.fillStyle = 'red';
//                     context.fill();
//                 }
//             });
//         }

//         requestAnimationFrame(detectFrame);
//     }

//     detectFrame();
// }

// async function main() {
//     const video = await setupCamera();
//     const canvas = document.getElementById('output');
//     await setupPoseDetection();

//     detectSquats(video, canvas);
// }

// main();
