import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

interface FonteConsumo {
  fonte: string;
  consumoSemanal: number;
  tempo: number;
  modificador: number;
  consumo: number;
  consumoMensal: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule, CommonModule, MatIconModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  total = 0;
  fonte = { fonte: '' }; // ou a estrutura que você está usando para 'fonte'
  modificador = { modificador: ''};
  fonteSelecionado = '';
  modificadorSelecionado = '';
  fontesCalculadas: string[] = [];

  fontesUsadas = { 
    lavar_roupa_maquina: false,
    lavar_roupa_tanque: false,
    banho_banheira: false,
    banho_chuveiro: false,
    escovar_dentes: false,
    vaso_sanitario: false,
    lavar_loucas_maquina: false,
    lavar_loucas_pia: false,
    lavar_quintal_balde: false,
    lavar_quintal_mangueira: false,
    piscina: false
   }

  opcoesmodificador = [
    { value: 1, label: 'Uma Vez' },
    { value: 2, label: 'Duas Vezes' },
    { value: 3, label: 'Tres Vezes' },
    { value: 4, label: 'Quatro Vezes' },
    { value: 5, label: 'Cinco Vezes' },
    { value: 6, label: 'Seis Vezes' },
    { value: 7, label: 'Todos os Dias' },
  ];

  opcoesmodificadorMensal = [
    { value: 1, label: 'Uma Vez' },
    { value: 2, label: 'Duas Vezes' },
    { value: 3, label: 'Tres Vezes' },
    { value: 4, label: 'Toda Semana' },
  ];

  categoriasFonte = [
    {
      categoria: 'Area de Serviço',
      opcoes: [
        { value: 'lavar_roupa_maquina', label: 'Lavar Roupa (Máquina)' },
        { value: 'lavar_roupa_tanque', label: 'Lavar Roupa (Tanque)' }
      ]
    },
    {
      categoria: 'Banheiro',
      opcoes: [
        { value: 'banho_banheira', label: 'Banho (Banheira)' },
        { value: 'banho_chuveiro', label: 'Banho (Chuveiro)' },
        { value: 'escovar_dentes', label: 'Escovar os Dentes' },
        { value: 'vaso_sanitario', label: 'Vaso Sanitário' }
      ]
    },
    {
      categoria: 'Cozinha',
      opcoes: [
        { value: 'lavar_loucas_maquina', label: 'Lavar Louças (Máquina)' },
        { value: 'lavar_loucas_pia', label: 'Lavar Louças (Pia)' }
      ]
    },
    {
      categoria: 'Quintal',
      opcoes: [
        { value: 'lavar_quintal_balde', label: 'Lavar o Quintal (Baldes)' },
        { value: 'lavar_quintal_mangueira', label: 'Lavar o Quintal (Mangueira)' },
        { value: 'piscina', label: 'Encher a Piscina' }
      ]
    }
  ];

  title = 'eco-agua';

  fontesConsumo: { fonte: string; consumoSemanal: number; tempo: number; modificador: number; consumo: number; consumoMensal: number }[] = [
    { fonte: '', consumoSemanal: 0, tempo: 1, modificador: 1, consumo: 0, consumoMensal: 0 }
  ];

  adicionarFonte() {
    this.fontesConsumo.push({ fonte: '', consumoSemanal: 0, tempo: 1, modificador: 1, consumo: 1, consumoMensal: 1 });
  }

  onFonteChange(fonte: string){
    console.log(fonte)
  }

  removerFonte(index: number) {
    console.log(this.fontesConsumo.at(index)?.fonte)
    if(this.fontesConsumo.at(index)?.fonte !== ''){
      switch(this.fontesConsumo.at(index)?.fonte){
        case 'lavar_roupa_maquina':
        this.fontesUsadas.lavar_roupa_maquina = false
        break
      case 'lavar_roupa_tanque':
        this.fontesUsadas.lavar_roupa_tanque = false
        break
      case 'banho_banheira':
        this.fontesUsadas.banho_banheira = false
        break
      case 'banho_chuveiro':
        this.fontesUsadas.banho_chuveiro = false
        break
      case 'escovar_dentes':
        this.fontesUsadas.escovar_dentes = false
        break
      case 'vaso_sanitario':
        this.fontesUsadas.vaso_sanitario = false
        break
      case 'lavar_loucas_maquina':
        this.fontesUsadas.lavar_loucas_maquina = false
        break
      case 'lavar_loucas_pia':
        this.fontesUsadas.lavar_loucas_pia = false
        break
      case 'lavar_quintal_balde':
        this.fontesUsadas.lavar_quintal_balde = false
        break
      case 'lavar_quintal_mangueira':
        this.fontesUsadas.lavar_quintal_mangueira = false
        break
      case 'piscina':
        this.fontesUsadas.piscina = false
        break
      }
    }
    this.fontesConsumo.splice(index, 1);
  }

  /* FONTES DE CONSUMO DE AGUA
  https://site.sanepar.com.br/informacoes/economia
  https://seer.ufrgs.br/index.php/ambienteconstruido/article/view/5358/3280
  */

  calcular() {
    this.total = 0;
    this.fontesCalculadas = []; // Limpar fontes calculadas antes de iniciar o cálculo
  
    this.fontesConsumo.forEach(fonte => {
      // Marcar as fontes usadas como true e adicioná-las à lista de fontes calculadas
      switch (fonte.fonte) {
        case 'lavar_roupa_maquina':
          this.fontesUsadas.lavar_roupa_maquina = true;
          this.fontesCalculadas.push('lavar_roupa_maquina');
          break;
        case 'lavar_roupa_tanque':
          this.fontesUsadas.lavar_roupa_tanque = true;
          this.fontesCalculadas.push('lavar_roupa_tanque');
          break;
        case 'banho_banheira':
          this.fontesUsadas.banho_banheira = true;
          this.fontesCalculadas.push('banho_banheira');
          break;
        case 'banho_chuveiro':
          this.fontesUsadas.banho_chuveiro = true;
          this.fontesCalculadas.push('banho_chuveiro');
          break;
        case 'escovar_dentes':
          this.fontesUsadas.escovar_dentes = true;
          this.fontesCalculadas.push('escovar_dentes');
          break;
        case 'vaso_sanitario':
          this.fontesUsadas.vaso_sanitario = true;
          this.fontesCalculadas.push('vaso_sanitario');
          break;
        case 'lavar_loucas_maquina':
          this.fontesUsadas.lavar_loucas_maquina = true;
          this.fontesCalculadas.push('lavar_loucas_maquina');
          break;
        case 'lavar_loucas_pia':
          this.fontesUsadas.lavar_loucas_pia = true;
          this.fontesCalculadas.push('lavar_loucas_pia');
          break;
        case 'lavar_quintal_balde':
          this.fontesUsadas.lavar_quintal_balde = true;
          this.fontesCalculadas.push('lavar_quintal_balde');
          break;
        case 'lavar_quintal_mangueira':
          this.fontesUsadas.lavar_loucas_pia = true;
          this.fontesCalculadas.push('lavar_quintal_mangueira');
          break;
        case 'piscina':
          this.fontesUsadas.piscina = true;
          this.fontesCalculadas.push('piscina');
          break;
      }
      this.calcular_consumo_diario(fonte);
    });
  
    console.log(this.total);
  }
  

  calcular_consumo_diario(fonteConsumo: FonteConsumo){
    this.fonteSelecionado = fonteConsumo.fonte
    let consumo: number
    console.log(this.fonteSelecionado, fonteConsumo.consumoSemanal, fonteConsumo.tempo, fonteConsumo.modificador)
    consumo = 0
    switch(this.fonteSelecionado){
      case 'lavar_roupa_maquina':
       consumo = (fonteConsumo.tempo * 20) * 1.45 * fonteConsumo.modificador
       console.log(consumo)
        break
      case 'lavar_roupa_tanque':
       consumo = (fonteConsumo.tempo * 60) * 18.6 * fonteConsumo.modificador
       console.log(consumo)
        break
      case 'banho_banheira':
       consumo = 80 * fonteConsumo.modificador
       console.log(consumo)
        break
      case 'banho_chuveiro':
       consumo = (fonteConsumo.modificador * 60) * 16
       console.log(consumo)
        break
      case 'escovar_dentes':
       consumo = 1.5 * fonteConsumo.modificador
       console.log(consumo)
        break
      case 'vaso_sanitario':
       consumo = 8 * fonteConsumo.modificador
       console.log(consumo)
        break
      case 'lavar_loucas_maquina':
       consumo = 20 * fonteConsumo.modificador
       console.log(consumo)
        break
      case 'lavar_loucas_pia':
       consumo = (fonteConsumo.tempo) * 7.8 * fonteConsumo.modificador
       console.log(consumo)
        break
      case 'lavar_quintal_balde':
       consumo = 20 * fonteConsumo.modificador
       console.log(consumo)
        break
      case 'lavar_quintal_mangueira':
       consumo = (fonteConsumo.tempo * 60) * 23 * fonteConsumo.modificador
       console.log(consumo)
        break
      case 'piscina':
        //uma piscina perde 816 litros de agua por mes
        consumo = 34
        break
    }

    fonteConsumo.consumo = parseFloat(consumo.toFixed(2));
    let consumoMensal = 0
    if(this.fonteSelecionado =="piscina"){
      consumoMensal = this.calcular_consumo_mensal_piscina(consumo, fonteConsumo.consumoSemanal)
      console.log("piscina calculada", consumoMensal)
    }else{
      consumoMensal = this.calcular_consumo_mensal(consumo, fonteConsumo.consumoSemanal)
    }
    fonteConsumo.consumoMensal = parseFloat(consumoMensal.toFixed(2));
    this.total += parseFloat(consumoMensal.toFixed(2));
  }

  calcular_consumo_mensal_piscina(consumoDiarioCalc: number, consumoSemanalCalc: number){
    let consumo: number
    consumo = consumoDiarioCalc * consumoSemanalCalc * 7

    return consumo
  }

  calcular_consumo_mensal(consumoDiarioCalc: number, consumoSemanalCalc: number){
    let consumo: number
    consumo = consumoDiarioCalc * consumoSemanalCalc * 4

    return consumo
  }

  
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
