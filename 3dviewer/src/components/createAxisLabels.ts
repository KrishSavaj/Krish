import * as THREE from 'three';

/**
 * @param scene - The scene to which the axis labels will be added.
 * @param axisDetails - An array of objects containing text, position, and color.
 * @returns void
 */

interface AxisDetails {
    text: string;
    position: THREE.Vector3;
    color: number;
}

export function createAxisLabels(
    scene: THREE.Scene,
    axisDetails: AxisDetails[],
): void {
    axisDetails.forEach(({ position, text, color }) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;

        if (context) {
            context.fillStyle = '#ffffff';
            context.font = '40px Arial';
            context.fillText(text, 16, 48);

            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                color: 0xffffff
            });

            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.copy(position);
            sprite.scale.set(3, 3, 1);
            sprite.userData.type = 'axisLabel';

            scene.add(sprite);
        }
    });
}
