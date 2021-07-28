const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75, window.innerWidth / window.innerHeight,
	0.1, 10000);

const renderer = new THREE.WebGLRenderer();
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.dampingFactor = 0.01
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

controls.update();

let cubeArray = [];
for (var k = 0; k < 18; k++) {
	for (var j = 0; j < 18; j++) {
		for (var i = 0; i < 18; i++) {
			var geometry = new THREE.CircleGeometry(1, 32);
			var material = new THREE.MeshBasicMaterial({
				//linewidth: 0,
				color: 0x100301,
				blending: THREE.AdditiveBlending,
				transparent: true
			});

			var object = new THREE.Mesh(geometry, material);

			object.rotation.x = k * 20;
			object.rotation.y = j * 20;
			object.rotation.z = i * 20;

			object.position.x = 0;
			object.position.y = 0;
			object.position.z = 0;

			cubeArray.push("object");
			scene.add(object);
		}
	}
}

const geometry2 = new THREE.BoxGeometry();
const material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry2, material2 );
//scene.add( cube );

camera.position.z = -5;

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	//console.log(navigator.hardwareConcurrency)

	renderer.render(scene, camera);

	//circle.rotation.x += 0.01;
	//circle.rotation.y += 0.01;
}
animate();
