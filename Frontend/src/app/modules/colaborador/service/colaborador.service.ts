import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH } from '../../../../environments/environment';
import { TurmaColaboradorCompetenciaModel } from '../../turma-colaborador-competencia/models/TurmaColaboradorCompetenciaModel';
import { CadastrarColaboradorModel } from '../models/cadastro-colaborador.model';
import {ColaboradorModel} from '../models/ColaboradorModel';

@Injectable({
    providedIn: 'root'
})
export class ColaboradorService {

  private url : String = 'colaborador'

  constructor(private _http : HttpClient) { }

  public inserir (colaborador : CadastrarColaboradorModel): Observable<CadastrarColaboradorModel>{
    return this._http.post<CadastrarColaboradorModel>(API_PATH + this.url, colaborador);
  }

    getColaborador(): Observable<ColaboradorModel[]> {
        return this._http.get<ColaboradorModel[]>(API_PATH + this.url);
    }

    atualizar(colaborador : CadastrarColaboradorModel): Observable<CadastrarColaboradorModel>{
      return this._http.put<CadastrarColaboradorModel>(API_PATH + this.url, colaborador);
    }

    buscarColaboradorPorId(id : number) : Observable<CadastrarColaboradorModel>{
      return this._http.get<CadastrarColaboradorModel>(API_PATH + this.url + '/' + id);
    }

    deletar(colaboradorId: number): Observable<ColaboradorModel>{
      return this._http.delete<ColaboradorModel>(API_PATH + this.url + '/' + colaboradorId);
    }

    buscarColaboradorEnsinou(id: number): Observable<TurmaColaboradorCompetenciaModel[]>{
      return this._http.get<TurmaColaboradorCompetenciaModel[]>(API_PATH + this.url + '/competenciasColaborador/' + id);
    }

}
