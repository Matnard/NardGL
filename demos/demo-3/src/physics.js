import * as CANNON from "cannon";

const demoPhysics = n => {
  const world = new CANNON.World();
  world.broadphase = new CANNON.NaiveBroadphase();
  world.gravity.set(0, -9.82, 0);

  const cannonCubes = Array.from({ length: n }).map((el, i) => {
    const body = new CANNON.Body({
      mass: 5, // kg
      position: new CANNON.Vec3(
        Math.random() - 0.5,
        2.5 * i + 0.5,
        Math.random() - 0.5
      ), // m
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
    });

    world.addBody(body);
    return body;
  });

  // Create a plane
  var groundBody = new CANNON.Body({
    mass: 0 // mass == 0 makes the body static
  });
  groundBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0),
    -Math.PI / 2
  );
  var groundShape = new CANNON.Plane();
  groundBody.addShape(groundShape);

  world.addBody(groundBody);

  return { world, bodies: cannonCubes };
};

export default demoPhysics;
