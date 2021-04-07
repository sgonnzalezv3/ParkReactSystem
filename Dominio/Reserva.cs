using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dominio
{
    public class Reserva
    {
        public Guid ReservaId { get; set; }
        [Required]

        public DateTime FechaCreacion { get; set; }
        [Required]

        public DateTime FechaReservaInicio { get; set; }
        [Required]

        public DateTime FechaReservaFin { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        [Required]

        public decimal PrecioTotal { get; set; }
        [Required]

        public string Nombres { get; set; }
        [Required]

        public string Apellidos { get; set; }
        public Guid ParqueId { get; set; }

        public Parque Parque { get; set; }

        public ReservaDetalle ReservaDetalle { get; set; }
    }
}
