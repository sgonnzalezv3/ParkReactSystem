using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    public class ReservaDetalle
    {
        [Key]
        public Guid ReservaDetalleId { get; set; }
        public int CantidadPersonas { get; set; }
        [ForeignKey("Reserva")]
        public Guid ReservaId { get; set; }
        [ForeignKey("Alojamiento")]
        public Guid AlojamientoId { get; set; }
        public int TotalDias { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal CostoAlojamiento { get; set; }
        public Alojamiento Alojamiento { get; set; }
        public Reserva Reserva { get; set; }

    }
}
