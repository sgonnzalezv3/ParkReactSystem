using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Dominio
{
    public class Parque
    {
        public Guid ParqueId { get; set; }
        [Required]

        public string Nombre { get; set; }
        [Required]

        public DateTime FechaApertura { get; set; }
        [Required]

        public string Extension { get; set; }
        [Required]

        public string Descripcion { get; set; }
        [Required]
        public bool Activo { get; set; }
        [Required]
        public Guid CarId { get; set; }
        public Car Car { get; set; }


        public ICollection<Alojamiento> Alojamientos { get; set; }
        public ICollection<Reserva> Reservas { get; set; }
        public ICollection<Ecosistema> Ecosistemas { get; set; }
        
    }
}
