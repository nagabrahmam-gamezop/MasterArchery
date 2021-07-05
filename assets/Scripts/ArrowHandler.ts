
import { _decorator, Component, Node, RigidBody2D, math, Quat, Contact2DType, Collider2D, IPhysics2DContact, Vec2, ERigidBody2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ArrowHandler')
export class ArrowHandler extends Component {

    private rb : RigidBody2D | null = null;
    private hasHit : boolean = false;

    start () {
        this.rb = this.getComponent(RigidBody2D);
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }
    }

    update (deltaTime: number) {
        if (this.hasHit) {
            return;
        }
        this.trackMovement();
    }

    private trackMovement () : void {
        let direction = this.rb?.linearVelocity;
        if (direction) {
            let angle = Math.atan2(direction.y, direction.x);
            let quat_rotate = new Quat();
            Quat.rotateZ(quat_rotate, quat_rotate, angle);
            this.node.setRotation(quat_rotate);
        }
    }

    private checkIfOutofBounds() : boolean {
        let isOutOfBounds : boolean = false;
        if (this.node.position.x > 620) {
            isOutOfBounds = true;
        }
        return isOutOfBounds;
    }

    private onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        console.log('onBeginContact');
        this.hasHit = true;
        if (this.rb) {
            this.rb.linearVelocity = Vec2.ZERO;
            this.rb.gravityScale = 0;
            this.rb.angularDamping = 0;
            this.rb.linearDamping = 0;
        }
    }

    private onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when the contact between two colliders just about to end.
        console.log('onEndContact');
        if(this.rb)
        this.rb.enabledContactListener = false;

        // this.rb.type = ERigidBody2DType.Kinematic;
    }

    private onPreSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called every time collider contact should be resolved
        console.log('onPreSolve');
    }

    private onPostSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called every time collider contact should be resolved
        console.log('onPostSolve');
    }
}