
import { _decorator, Component, Node, systemEvent, SystemEvent, Quat, Vec3, Prefab, math, instantiate, RigidBody, RigidBody2D, Vec2 } from 'cc';
import { ArrowHandler } from './ArrowHandler';
const { ccclass, property } = _decorator;

@ccclass('BowHandler')
export class BowHandler extends Component {

    @property({type : Prefab})
    private arrow : Node | null = null;

    private startRotation : Quat = new Quat();
    private endRotation : Quat = new Quat();
    private direction : Vec3 = new Vec3();
    private speed : number = 0.4;
    private elapsed : number = 0.0;
    private startInterp : boolean = false;

    start () {
        this.reset();
    }

    update (deltaTime: number) {
        if(this.startInterp)
        {
            this.elapsed += deltaTime * this.speed;
            let result = new Quat();
            Quat.slerp(result,this.startRotation,this.endRotation,this.elapsed);
            this.node.setRotation(result);
            if(Quat.equals(result,this.endRotation,.001))
            {
                Quat.toAxisZ(this.direction,result);
                this.startInterp = false;

            }
        }
    }

    private onKeyDown () : void {
        this.startInterp = true;
    }

    private onKeyUp () : void {
        this.stopAiming();
    }

    private stopAiming () : void
    {
        this.startInterp = false;
        systemEvent.off(SystemEvent.EventType.MOUSE_DOWN);
        systemEvent.off(SystemEvent.EventType.MOUSE_UP);
        this.throwArrow();
    }

    private throwArrow () : void
    {
        let vec = new Vec3();
        Quat.toEuler(vec, this.node.rotation);
        let arrow = instantiate(this.arrow);
        if (arrow) {
            //@ts-ignore
            arrow.parent = this.node.parent?.parent;
            arrow.setRotation(this.node.rotation);
            //@ts-ignore
            arrow.setPosition(this.node.parent?.position);
            const arrow_rigid_body = arrow.getComponent(RigidBody2D);
            arrow_rigid_body?.applyLinearImpulseToCenter(new Vec2(50, vec.z), false);

        }
        setTimeout(() => {
            this.reset();
        }, 2500);
    }

    private reset() : void {
        this.elapsed = 0.0;
        this.startInterp = false;
        let quat = new Quat(0, 0, 0);
        this.node.setRotation(quat);
        systemEvent.on(SystemEvent.EventType.MOUSE_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onKeyUp, this);
        Quat.fromAngleZ(this.startRotation, 0);
        Quat.fromAngleZ(this.endRotation, 50);
    }
}

