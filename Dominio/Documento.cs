using System;
using System.ComponentModel.DataAnnotations;


namespace Dominio
{
    public class Documento
    {
        public Guid DocumentoId { get; set; }
        [Required]

        public string NombreD { get; set; }
        [Required]

        public string ExtensionD { get; set; }
        [Required]

        public byte[] Contenido { get; set; }
        [Required]

        public DateTime FechaCreacion { get; set; }
        [Required]

        public Guid ObjetoReferencia { get; set; }
    }
}
