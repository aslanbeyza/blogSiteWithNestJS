import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";


/* ne dedim jwt extract et biyerden al nerden bearer tokendan al secreti ney  o secretle verify edicez ya decode ediyoruz ve kullanıcının geçmesine izin veriyoruz 


*/
@Injectable()
export class JwtStratey extends PassportStrategy(Strategy , 'jwt') {
constructor(){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey:'beyzoşş',
    })
}
validate(payload:string){
    return payload;
    }
}

/* Bu kısım onaylanmadan geçilemez gibi bişey koymamız lazım guard yani */
/* burda jwt stratejisi oluşturduk ve bunu kullanmak için app.module.ts de import etmemiz lazım ve kullanmamız lazım  */