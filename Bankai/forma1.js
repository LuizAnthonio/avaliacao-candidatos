class Bakai{



      static contaDiasRestantes(data){

       
        // Converte a diferença de milissegundos para dias
        const umDiaEmMilissegundos = 24 * 60 * 60 * 1000; // 24 horas * 60 minutos * 60 segundos * 1000 milissegundos
    
           
        
        const prazoTarefa = data;
        const hoje = new Date()

       
        
        const difDia = prazoTarefa - hoje;

        //console.log(difDia)

        const faltam = Math.ceil(difDia / umDiaEmMilissegundos)
        
        
        const result = faltam - 6;
        
        console.log("Tarefa tempo: ",result)

        return result;

    }


      static data(datinha){
        let dia = new Date(datinha).getDate();
        let mes = new Date(datinha).getMonth();
        let ano = new Date(datinha).getFullYear();
    
        mes < 9 ? mes = `0${mes}` : 0
        dia < 9 ? dia = `0${dia}` : 0
    
        return `${dia}/${mes}/${ano}`;
    
    }


      static status(int,prazo){

        let prazoData = new Date(prazo)
        let hoje = new Date()

        if(int < 1){
          
          return "Não iniciada";
          
        }else if(int === 1 && this.contaDiasRestantes(prazo) > 0){
          
          return "Fazendo";
          
          
          
        }else if(int === 2){
          
          return "Feito";

        }else{
          return "Atrasado"
        }


      }

    static formatarObj(objeto) {
        
        let result = []
        
        for(let i in objeto){
            let obj = objeto[i];
            

            obj.status = this.status(parseInt(obj.status),obj.prazo);
            obj.prazo = this.data(obj.prazo);
            obj.dataAbertura = this.data(obj.dataAbertura);
            obj.assignedTo = {idUser: obj.assignedTo.id, name: obj.assignedTo.name, cargo: obj.assignedTo.permissao == 0 ? "Admin" : "Atendente"}


            result.push(obj)

        }

        return result;
    }


}

module.exports = Bakai;