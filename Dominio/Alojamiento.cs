using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dominio
{
    public class Alojamiento
    {
        public Guid AlojamientoId { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]

        public int Capacidad { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        [Required]

        public decimal Precio { get; set; } 
        public Parque Parque { get; set; }
        public Guid ParqueId { get; set; }
        public int TotalAlojamientos { get; set; }
        public bool Activo { get; set; }
        public ICollection<ReservaDetalle> ReservaDetalles { get; set; }


    }
}
