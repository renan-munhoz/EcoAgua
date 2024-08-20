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

  opcoesmodificador = [
    { value: 1, label: 'Uma Vez' },
    { value: 2, label: 'Duas Vezes' },
    { value: 3, label: 'Tres Vezes' },
    { value: 4, label: 'Quatro Vezes' },
    { value: 5, label: 'Cinco Vezes' },
    { value: 6, label: 'Seis Vezes' },
    { value: 7, label: 'Todos os Dias' },
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
        { value: 'piscina', label: 'Piscina' }
      ]
    }
  ];

  title = 'eco-agua';

  fontesConsumo: { fonte: string; consumoSemanal: number; tempo: number; modificador: number; consumo: number; consumoMensal: number }[] = [
    { fonte: '', consumoSemanal: 0, tempo: 1, modificador: 1, consumo: 0, consumoMensal: 0 }
  ];

  adicionarFonte() {
    this.fontesConsumo.push({ fonte: '', consumoSemanal: 0, tempo: 1, modificador: 1, consumo: 0, consumoMensal: 0 });
  }

  removerFonte(index: number) {
    this.fontesConsumo.splice(index, 1);
  }

  /* FONTES DE CONSUMO DE AGUA
  https://site.sanepar.com.br/informacoes/economia
  https://seer.ufrgs.br/index.php/ambienteconstruido/article/view/5358/3280
  */

  calcular() {
    this.fontesConsumo.forEach(fonte => {
      this.calcular_consumo_diario(fonte);
    });
    console.log(this.total)
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
      /*case 'piscina':
        //uma piscina perde 816 litros de agua por mes
       consumo = 
        break*/
    }

    fonteConsumo.consumo = parseFloat(consumo.toFixed(2));
    let consumoMensal = this.calcular_consumo_mensal(consumo, fonteConsumo.consumoSemanal)
    fonteConsumo.consumoMensal = parseFloat(consumoMensal.toFixed(2));
    this.total += parseFloat(consumoMensal.toFixed(2));
  }

  calcular_consumo_mensal(consumoDiarioCalc: number, consumoSemanalCalc: number){
    let consumo: number
    consumo = consumoDiarioCalc * consumoSemanalCalc * 4

    return consumo
  }
}
