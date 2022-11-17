class Drone {
    constructor() {
        this.position = 0;
        this.velocity = 0;
        this.acceleration = 0;
    }

    update() {
        if (this.position > GROUND) {
            // On or below ground
            this.acceleration = 0;
            this.position = GROUND + 1;
            this.velocity = 0;
        } else {
            // Above ground
            this.acceleration += GRAVITY;
            this.velocity += this.acceleration;
            this.position += this.velocity;
            text("ACCELERATION " + -this.acceleration.toFixed(2), 400, 125);
            this.acceleration = 0;
        }
    }

    propel(t) {
        this.acceleration -= t;
        if (this.position > GROUND) {
            this.position = GROUND - 1;
        }
    }
    show_stats() {
        let pos = 1;
        let offset = 30;
        let px = 400;
        // text("ACCELERATION " + this.acceleration.toFixed(0), px, pos * offset);
        text("VELOCITY " + -this.velocity.toFixed(1), px, ++pos * offset);
        text(
            "POSITION :" + -(this.position.toFixed(0) - GROUND - 1),
            px,
            ++pos * offset
        );
    }
    data() {
        return {
            acceleration: this.acceleration,
            velocity: this.velocity,
            position: this.position,
        };
    }
}
