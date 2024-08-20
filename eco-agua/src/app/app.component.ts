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
  vezes: number;
  tempoDiario: number;
  consumoDiario: number;
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
  fonte = { fonte: '' }; // ou a estrutura que você está usando para 'fonte'
  vezes = { vezes: ''};
  fonteSelecionado = '';

  opcoesVezes = [
    { value: 'um', label: 'Uma Vez' },
    { value: 'dois', label: 'Duas Vezes' },
    { value: 'tres', label: 'Tres Vezes' },
    { value: 'quatro', label: 'Quatro Vezes' },
    { value: 'cinco', label: 'Cinco Vezes' },
    { value: 'seis', label: 'Seis Vezes' },
    { value: 'todos_os_dias', label: 'Todos os Dias' },
    // Adicione mais opções aqui
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

  fontesConsumo: { fonte: string; tempoDiario: number; consumoDiario: number; consumoMensal: number }[] = [
    { fonte: '', tempoDiario: 0, consumoDiario: 0, consumoMensal: 0 }
  ];

  adicionarFonte() {
    this.fontesConsumo.push({ fonte: '', tempoDiario: 0, consumoDiario: 0, consumoMensal: 0 });
  }

  removerFonte(index: number) {
    this.fontesConsumo.splice(index, 1);
  }

  calcular_consumo_diario(fonteConsumo: FonteConsumo){
    this.fonteSelecionado = fonteConsumo.fonte
    let consumoDiario: number
    switch(this.fonteSelecionado){
      case 'lavar_roupa_maquina':
        consumoDiario = (fonteConsumo.tempoDiario * 60) * 168
        break
      case 'lavar_roupa_tanque':
        consumoDiario = (fonteConsumo.tempoDiario * 60) * 1120
        break
      case 'banho_banheira':
        consumoDiario = (fonteConsumo.tempoDiario * 60) * 168
        break
      case 'banho_chuveiro':
        consumoDiario = (fonteConsumo.tempoDiario * 60) * 168
        break
      case 'escovar_dentes':
        consumoDiario = (fonteConsumo.tempoDiario * 60) * 168
        break
      case 'vaso_sanitario':
        consumoDiario = (fonteConsumo.tempoDiario * 60) * 168
        break
      case 'lavar_loucas_maquina':
        consumoDiario = (fonteConsumo.tempoDiario * 60) * 168
        break
      case 'lavar_loucas_pia':
        consumoDiario = (fonteConsumo.tempoDiario * 60) * 168
        break
      case 'lavar_quintal_balde':
        consumoDiario = (fonteConsumo.tempoDiario * 60) * 168
        break
      case 'lavar_quintal_mangueira':
        consumoDiario = (fonteConsumo.tempoDiario * 60) * 168
        break
      case 'piscina':
        consumoDiario = (fonteConsumo.tempoDiario * 60) * 168
        break
    }
  }
}
