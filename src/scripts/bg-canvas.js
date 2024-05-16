import * as THREE from 'three';

var element = document.getElementById("canvas") || document.body;
var options = { antialias: true };

if (element instanceof HTMLCanvasElement) {
    options.canvas = element;
}

var renderer = new THREE.WebGLRenderer(options);
renderer.setClearColor(0x000000, 0);

if (!options.canvas) {
    element.appendChild(renderer.domElement);
    var canvas = renderer.domElement;
} else {
    var canvas = element;
}

// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 1, 1000);
camera.position.z = 500;

// Fog
scene.fog = new THREE.Fog(0x222125, 0.005, 560, 1000);

// Variables
var particles, particle, particleMaterial, particleCount, points, texture;
var xSpeed, ySpeed;

// Speed
xSpeed = 0.002;
ySpeed = 0.00000005;

// Particles
particleCount = 10000;
particles = new THREE.BufferGeometry();
var positions = new Float32Array(particleCount * 3);
var velocities = new Float32Array(particleCount * 3);

for (var i = 0; i < particleCount; i++) {
    var px = Math.random() * 2000 - 1000;
    var py = Math.random() * 2000 - 1000;
    var pz = Math.random() * 2000 - 1000;

    positions[i * 3] = px;
    positions[i * 3 + 1] = py;
    positions[i * 3 + 2] = pz;

    velocities[i * 3] = 0;
    velocities[i * 3 + 1] = Math.random();
    velocities[i * 3 + 2] = 0;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

var material = new THREE.PointsMaterial({ color: 0xffffff });

points = new THREE.Points(particles, material);
scene.add(points);

// Lights
var light1, light2, hemiLight;

light1 = new THREE.PointLight(0x52ffef, 100, 600);
light1.position.set(-200, 300, 300);
scene.add(light1);

light2 = new THREE.PointLight(0x53ffd1, 50, 600);
light2.position.set(250, -300, 300);
scene.add(light2);

hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 5);
hemiLight.position.set(0, 500, 0);
scene.add(hemiLight);

// Resize
var resize = function () {
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    if (canvas.width != width || canvas.height != height) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
};

// Render
var render = function () {
    // Call resize
    resize();

    // Animate particles randomly
    var positions = particles.attributes.position.array;
    var velocities = particles.attributes.velocity.array;
    for (var i = 0; i < particleCount; i++) {
        var y = positions[i * 3 + 1];
        if (y > 1000) {
            positions[i * 3 + 1] = -1000;
            velocities[i * 3 + 1] = Math.random();
        }

        velocities[i * 3 + 1] += Math.random() * ySpeed;
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
    }
    particles.attributes.position.needsUpdate = true;

    // Points to go upwards
    points.rotation.y += xSpeed;

    // Call scene and camera
    renderer.render(scene, camera);

    // Update animation frame
    requestAnimationFrame(render);
};

// Call render
render();
