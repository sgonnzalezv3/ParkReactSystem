﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    /*Idenitty contiene todas las propeidades*/
    public class Usuario : IdentityUser
    {
        public string NombreCompleto { get; set; }
    }
}
