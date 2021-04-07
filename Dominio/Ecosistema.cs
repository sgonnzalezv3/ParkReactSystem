using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Dominio
{
    public class Ecosistema
    {
        public Guid EcosistemaId { get; set; }
        [Required]

        public string Nombre { get; set; }
        [Required]

        public string NombreCientifico { get; set; }
        [Required]

        public string Descripcion { get; set; }
        
        public ICollection<Parque>  Parques { get; set; }
    }
}
