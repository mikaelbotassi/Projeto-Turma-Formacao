import { Observable } from 'rxjs';
import { CompetenciaModel } from './../../../../competencia/models/competencia.model';
import { ColaboradorModel } from './../../../../colaborador/models/ColaboradorModel';
import { CompetenciaListaModel } from './../../CompetenciaListaModel';
import { ColaboradorListaModel } from './../../ColaboradorListaModel';
import { TurmaColaboradorCompetenciaNivelModel } from './../../../../turma-colaborador-competencia/models/TurmaColaboradorCompetenciaNivelModel';
import { TurmaFormacaoModel } from './../../TurmaFormacaoModel';
import { turmaFormacaoService } from './../../../service/turma-formacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TurmaColaboradorCompetenciaModel } from 'src/app/modules/turma-colaborador-competencia/models/TurmaColaboradorCompetenciaModel';
import { TriStateCheckbox, SelectItem } from 'primeng';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-turma-formacao-crud',
  templateUrl: './turma-formacao-crud.component.html',
  styleUrls: ['./turma-formacao-crud.component.scss']
})
export class TurmaFormacaoCrudComponent implements OnInit {

  display: boolean = false;
  colab: boolean = false;
  turmas:TurmaFormacaoModel[] = [];
  turmaFormacaoModel: TurmaFormacaoModel;
  succes: boolean = false;
  displayAlt: boolean = false;
  turmaDetalhada: TurmaFormacaoModel;
  turmaColaboradorCompetencia: TurmaColaboradorCompetenciaNivelModel;
  turmaColaboradorCompetenciaList:TurmaColaboradorCompetenciaNivelModel[] = [];
  colaboradoresDisponiveis:  ColaboradorListaModel[] =[];
  colaboradoresTotal:ColaboradorListaModel[] = [];
  competenciasTotal: CompetenciaListaModel[] = [];
  competenciasDisponiveis: CompetenciaListaModel[] = [];
  colaboradorCompetenciaHolder: TurmaColaboradorCompetenciaNivelModel[] = [];
  colaboradorHolder: TurmaColaboradorCompetenciaNivelModel;
  colaboradorDropDown: ColaboradorListaModel ;
  competenciaDropDown: CompetenciaListaModel;
  inputNomeTurma: String;
  inputDescricaoTurma: String;
  statusDisponiveis: TurmaFormacaoModel[] = [];  


@ViewChild('dt') table: TurmaFormacaoModel;


 ngOnInit(): void {
  this.listarTurmas();
  this.listarColaboradoresAutoComplete();
  this.listarCompetenciasAutoComplete();
  this.colaboradorHolder = new TurmaColaboradorCompetenciaNivelModel(null,null,null,null,null,null, null);
}

constructor(private turmaFormacaoService: turmaFormacaoService) {}




//Mostrar modais

showDialog(){
  this.display = true;
}

showColab(){
 this.colab = true;
}

showDialogAlt(turma: TurmaFormacaoModel){
  this.displayAlt = true;
this.turmaDetalhada = turma;
this.inputDescricaoTurma = turma.descricao;
this.inputNomeTurma = turma.nome;
}

teste(evento){
  console.log(evento.value.statusNome);
   
}

//Listar 

listarTurmas(){
  
}


listarColaboradoresAutoComplete(){
this.turmaFormacaoService.listarColaborador().subscribe(colaborador => {
  this.colaboradoresTotal = colaborador;
})



}

listarCompetenciasAutoComplete(){
  this.turmaFormacaoService.listarCompetencia().subscribe(competencia => {
    this.competenciasTotal = competencia;
  })
  
  
  }

listarTurmaColaboradorCompetencia(turmaId: number){
  this.turmaFormacaoService.listarTurmaColaboradorCompetencia(turmaId).subscribe(colaborador => {
    this.colaboradorCompetenciaHolder = colaborador;
  })
}

//inserir

inserirTurma(){
  this.turmaFormacaoModel = new TurmaFormacaoModel(this.inputNomeTurma,this.inputDescricaoTurma,new Date,null,1, null);
  this.inputNomeTurma = null;
  this.inputDescricaoTurma = null;
  this.turmaFormacaoService.registrarTurma(this.turmaFormacaoModel).subscribe(
    turma => {
      return this.inserirListaColaborador(turma.id)
    }
  );
  

}

inserirListaColaborador(turmaId:number){

  let turmaColaboradoresTemp: TurmaColaboradorCompetenciaModel[] = [];
    this.turmaFormacaoService.listarTurmaColaboradorCompetencia(turmaId).subscribe(colaboradoresTurma => {
      turmaColaboradoresTemp = colaboradoresTurma;
    });
  this.colaboradorCompetenciaHolder.forEach(colaborador =>{
    let turmaTemp = new TurmaColaboradorCompetenciaModel(turmaId,colaborador.colaboradorId,colaborador.competenciaId);
    if(turmaColaboradoresTemp.indexOf(turmaTemp) == -1){
      this.turmaFormacaoService.registrarTurmaColaboradorCompetencia(turmaTemp).subscribe(retorno =>{
        console.log("certo");
      });
    }
  }


    )
  this.succes = true;
  this.colaboradorCompetenciaHolder = [];
  this.listarTurmas();

}

inserirTurmaIniciando(){
  this.turmaFormacaoModel = new TurmaFormacaoModel(this.inputNomeTurma,this.inputDescricaoTurma,new Date,null,2, null);
  this.inputNomeTurma = null;
  this.inputDescricaoTurma = null;
  this.turmaFormacaoService.registrarTurma(this.turmaFormacaoModel).subscribe(
    turma => {
      return this.inserirListaColaborador(turma.id)
    }
  );
  this.succes = true;

}



  

inserirColaboradorCompetenciaHolder(){
  let colaboradorObj = null;
  this.turmaFormacaoService.procurarNivelColaboradorCompetencia(this.colaboradorDropDown.id, this.competenciaDropDown.id)
  .subscribe(colaboradorTempAdd =>{ 
    colaboradorObj = colaboradorTempAdd;
    if(colaboradorObj == null ){
      this.turmaFormacaoService.cadastrarColaboradorCompetenciaZero(this.colaboradorDropDown.id, this.competenciaDropDown.id).subscribe(temp =>{
        this.turmaFormacaoService.procurarNivelColaboradorCompetencia(this.colaboradorDropDown.id, this.competenciaDropDown.id).subscribe(colaboradorTemp =>{
          if(this.colaboradorCompetenciaHolder.findIndex((colaborador) => colaborador.colaboradorId  === this.colaboradorDropDown.id && colaborador.competenciaId === this.competenciaDropDown.id) == -1) {
            console.log("adicao na lista");
            console.log(colaboradorTemp);
            this.colaboradorCompetenciaHolder.push(colaboradorTemp);   
          }
          this.colaboradorDropDown = new ColaboradorListaModel(null,null,null);
        this.competenciaDropDown = new CompetenciaListaModel(null,null);
        })  
      })
     } else{
        this.turmaFormacaoService.procurarNivelColaboradorCompetencia(this.colaboradorDropDown.id, this.competenciaDropDown.id).subscribe(colaboradorTemp =>{
          if(this.colaboradorCompetenciaHolder.findIndex((colaborador) => colaborador.colaboradorId  === this.colaboradorDropDown.id && colaborador.competenciaId === this.competenciaDropDown.id) == -1) {
            console.log("adicao na lista");
            console.log(colaboradorTemp);
            this.colaboradorCompetenciaHolder.push(colaboradorTemp);   
          }
          this.colaboradorDropDown = new ColaboradorListaModel(null,null,null);
        this.competenciaDropDown = new CompetenciaListaModel(null,null);  
      })
     }
  
  
  
  
  


  
})
}


//filtrar

filtrarColaboradores(event){
  let value = event.query;

  if(value == undefined || value.trim() == ''){
    this.colaboradoresDisponiveis = this.colaboradoresTotal;
    return;
}
  this.colaboradoresDisponiveis = this.colaboradoresTotal.filter((colaborador)=>
    colaborador.nome.toLowerCase().indexOf(value.toLowerCase()) >=0
  
  );

}

filtrarCompetencias(event){
  let value = event.query;

  if(value == undefined || value.trim() == ''){
    this.competenciasDisponiveis = this.competenciasTotal;
    return;
}
  this.competenciasDisponiveis = this.competenciasTotal.filter((competencia)=>
    competencia.nome.toLowerCase().indexOf(value.toLowerCase()) >=0
  
  );
}



//modificar


iniciarTurma(turma: TurmaFormacaoModel){
turma.statusId = 2;
  this.turmaFormacaoService.alterarTurma(turma).subscribe(
    turma => {
      console.log("certo");
    }
  );

}

finalizarTurma(turma: TurmaFormacaoModel){
  turma.statusId = 3;
  turma.termino = new Date;
    this.turmaFormacaoService.alterarTurma(turma).subscribe(
      turma => {
        console.log("certo");
      }
    );

    this.listarTurmaColaboradorCompetencia(turma.id);
    this.colaboradorCompetenciaHolder.forEach(colaborador=>
      this.turmaFormacaoService.subirNivelColaboradorCompetencia(colaborador.colaboradorId, colaborador.competenciaId).subscribe(retorno => {
        console.log("certo");
      })
      )
  
  }




alterarTurma(turma: TurmaFormacaoModel){
  turma.nome = this.inputNomeTurma;
  turma.descricao = this.inputDescricaoTurma;
  this.turmaFormacaoService.alterarTurma(turma).subscribe(
    turma => {
      console.log("certo");
    }
  );
  this.inserirListaColaborador(turma.id)
}

limparHolderColaboradorCompetencia(event){
  this.colaboradorCompetenciaHolder = [];
  this.inputNomeTurma = null;
  this.inputDescricaoTurma = null;
}

//desabilitar

desabilitarBotaoPorColaborador(status:number) : boolean{
  if(status == 1){
    return false;
  } else{
    return true;
  }
  }

desabilitarBotaoTerminar(status:number): boolean{
  if(status == 2){
    return false;
  } else{
    return true;
  }
  }

  desabilitarCadastrar(): boolean{
    if(this.inputNomeTurma != null && this.inputDescricaoTurma != null){
      return false;
    }
    return true;
  }


  validacaoTurma(): boolean{
    let colaboradorCompetenciaMaterias: number[] = [];

    if(this.colaboradorCompetenciaHolder.length == 0){
      return false;
    }

    this.colaboradorCompetenciaHolder.forEach((colaborador) => {
      if(colaborador.nivel == 3){
        colaboradorCompetenciaMaterias.push(colaborador.competenciaId);
      }
    });

    if(colaboradorCompetenciaMaterias.length == 0){
      return false;
    }

    this.colaboradorCompetenciaHolder.forEach((colaborador)=>{
      if( ( ( (colaborador.nivel != 3) && (colaboradorCompetenciaMaterias.indexOf(colaborador.competenciaId) == -1 ) ) || (colaborador == undefined) ) ){
        return false;
      }
    });
    return true;
  }

  desabilitarCadastrarIniciando(statusId: number){
    if(statusId == 3){
      return true;
    }else{
      if(!(this.desabilitarCadastrar()) && this.validacaoTurma()  ){
        return false;
      }
    }
    return true;
  }

  desabilitarInputCompetencia(valor:String): boolean{
    if(valor == null || valor == ''){
      return true
    }
    return false
  }

desabilitarBotaoColaboradorCompetencia(valor:Number): boolean{
  if(valor == 1){
    return false
  }
  return true
}

desabilitarBotaoColaboradorCompetenciaAlt(valor:Number): boolean{
  if(valor == 3){
    return true;
  }
  return false;
}

desabilitarAdicionarColaboradorCompetenciaPorCampo(campo1: String, campo2: String): boolean{
  if(campo1 == null || campo2 == null){
    return true
  }
  return false
}

desabilitarDeletarTurma(status:Number): boolean{
  if(status == 1){
    return false;
  }
  return true;
}

desabilitarBotaoAdicionarColaborador(status:number){
  if(status == 3 ||!(this.colaboradorDropDown != null && this.competenciaDropDown != null)){
    return true;
  }
  return false;
}


//deletar



deletarColaboradorCompetenciaHolder(colaboradorSelecionado: TurmaColaboradorCompetenciaNivelModel){
  this.colaboradorCompetenciaHolder.splice(this.colaboradorCompetenciaHolder.findIndex((colaborador) => colaboradorSelecionado.colaboradorId === colaborador.colaboradorId && colaborador.competenciaId === colaboradorSelecionado.competenciaId ), 1);
}

deletarColaboradorCompetenciaHolderAlt(colaboradorSelecionado: TurmaColaboradorCompetenciaNivelModel, turmaId: number){
  colaboradorSelecionado.turmaId = turmaId;

  
  if(this.colaboradorCompetenciaHolder.findIndex((colaborador) => colaboradorSelecionado.colaboradorId === colaborador.colaboradorId &&
   colaborador.competenciaId === colaboradorSelecionado.competenciaId) !=-1){
     this.turmaFormacaoService.deletarTurmaColaboradorCompetencia(colaboradorSelecionado).subscribe();
   }

  this.colaboradorCompetenciaHolder.splice(this.colaboradorCompetenciaHolder.findIndex((colaborador) => colaboradorSelecionado.colaboradorId === colaborador.colaboradorId && colaborador.competenciaId === colaboradorSelecionado.competenciaId ), 1);
}



}