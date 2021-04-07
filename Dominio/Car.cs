using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Dominio
{
    public class Car
    {
        public Guid CarId { get; set; }
        [Required]

        public string Nombre { get; set; }
        [Required]

        public string Descripcion { get; set; }
        public ICollection<Parque> Parques { get; set; }
        [Required]
        public bool Activo { get; set; }
    }
}
