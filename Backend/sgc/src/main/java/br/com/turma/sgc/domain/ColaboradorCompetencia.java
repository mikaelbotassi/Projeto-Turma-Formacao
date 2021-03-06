package br.com.turma.sgc.domain;

import br.com.turma.sgc.domain.pk.ColaboradorCompetenciaPK;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Table(name = "colaborador_competencia")
@AllArgsConstructor
public class ColaboradorCompetencia implements Serializable {

    @EmbeddedId
    private ColaboradorCompetenciaPK id;

    @ManyToOne
    @MapsId("idColaborador")
    @JoinColumn(name = "id_colaborador")
    private Colaborador colaborador;

    @ManyToOne
    @MapsId("idCompetencia")
    @JoinColumn(name = "id_competencia")
    private Competencia competencia;

    @Column(name = "nivel")
    private Integer nivel;

    public ColaboradorCompetencia(){
        this.id = new ColaboradorCompetenciaPK();
    }
}
