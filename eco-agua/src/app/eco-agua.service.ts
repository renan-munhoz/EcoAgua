import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EcoAguaService {
  constructor() { }

  get_media_mensal(fonte:string){
    let media = 0;
    switch(fonte){
      case 'lavar_roupa_maquina':
        media = 480
        break
      case 'lavar_roupa_tanque':
        media = 6696
        break
      case 'banho_banheira':
        media = 320
        break
      case 'banho_chuveiro':
        media = 7200
        break
      case 'escovar_dentes':
        media = 135
        break
      case 'vaso_sanitario':
        media = 1200
        break
      case 'lavar_loucas_maquina':
        media = 900
        break
      case 'lavar_loucas_pia':
        media = 10530
        break
      case 'lavar_quintal_balde':
        media = 420
        break
      case 'lavar_quintal_mangueira':
        media = 2300
        break
      /*case 'piscina':
        media = ''
        break*/
    }

    return media
  }
}
