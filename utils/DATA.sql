//
CREATE TABLE public."MascotaObservacion"
(
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idMascota" integer NOT NULL,
    "idObservacion" integer NOT NULL,
    CONSTRAINT "MascotaObservacion_pkey" PRIMARY KEY ("idMascota", "idObservacion"),
    CONSTRAINT "MascotaObservacion_idMascota_fkey" FOREIGN KEY ("idMascota")
        REFERENCES public.mascota (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "MascotaObservacion_idObservacion_fkey" FOREIGN KEY ("idObservacion")
        REFERENCES public.observacion (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
CREATE TABLE public.asociacion
(
    id integer NOT NULL DEFAULT nextval('asociacion_id_seq'::regclass),
    nombre text COLLATE pg_catalog."default" NOT NULL,
    estado boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT asociacion_pkey PRIMARY KEY (id)
)

CREATE TABLE public.comportamiento
(
    id integer NOT NULL DEFAULT nextval('comportamiento_id_seq'::regclass),
    nombre text COLLATE pg_catalog."default" NOT NULL,
    estado boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT comportamiento_pkey PRIMARY KEY (id)
)
//
CREATE TABLE public."comportamientoMascota"
(
    id integer NOT NULL DEFAULT nextval('"comportamientoMascota_id_seq"'::regclass),
    estado boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idMascota" integer,
    "idComportamiento" integer,
    CONSTRAINT "comportamientoMascota_pkey" PRIMARY KEY (id),
    CONSTRAINT "comportamientoMascota_idMascota_idComportamiento_key" UNIQUE ("idMascota", "idComportamiento"),
    CONSTRAINT "comportamientoMascota_idComportamiento_fkey" FOREIGN KEY ("idComportamiento")
        REFERENCES public.comportamiento (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "comportamientoMascota_idMascota_fkey" FOREIGN KEY ("idMascota")
        REFERENCES public.mascota (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
CREATE TABLE public.entidad
(
    id integer NOT NULL DEFAULT nextval('entidad_id_seq'::regclass),
    nombre text COLLATE pg_catalog."default" NOT NULL,
    siglas text COLLATE pg_catalog."default",
    ruc character(11) COLLATE pg_catalog."default",
    estado boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT entidad_pkey PRIMARY KEY (id)
)
//
CREATE TABLE public."familiarBeneficiario"
(
    id integer NOT NULL DEFAULT nextval('"familiarBeneficiario_id_seq"'::regclass),
    "tipoFamiliar" text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idTitular" integer,
    "idFamiliar" integer,
    CONSTRAINT "familiarBeneficiario_pkey" PRIMARY KEY (id),
    CONSTRAINT "familiarBeneficiario_idFamiliar_fkey" FOREIGN KEY ("idFamiliar")
        REFERENCES public."personaBeneficiario" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT "familiarBeneficiario_idTitular_fkey" FOREIGN KEY ("idTitular")
        REFERENCES public."personaBeneficiario" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

CREATE TABLE public."libroIncidencia"
(
    id integer NOT NULL DEFAULT nextval('"libroIncidencia_id_seq"'::regclass),
    serie text COLLATE pg_catalog."default" NOT NULL,
    correlativo integer NOT NULL,
    fecha timestamp with time zone NOT NULL,
    // CLAVE FORANEA
    "tipoIncidencia" integer NOT NULL,
    // CLAVE FORANEA
    "tipoNotificacion" integer,
    descripcion text COLLATE pg_catalog."default" NOT NULL,
    "accionesTomadas" text COLLATE pg_catalog."default",
    "idSituacion" integer NOT NULL DEFAULT 1,
    "nombreSituacion" text COLLATE pg_catalog."default" NOT NULL DEFAULT 'ENVIADO'::text,
    estado boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idSede" integer,
    "idPersona" integer,
    CONSTRAINT "libroIncidencia_pkey" PRIMARY KEY (id),
    CONSTRAINT "libroIncidencia_idPersona_fkey" FOREIGN KEY ("idPersona")
        REFERENCES public.persona (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT "libroIncidencia_idSede_fkey" FOREIGN KEY ("idSede")
        REFERENCES public.sede (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

CREATE TABLE public.mascota
(
    id integer NOT NULL DEFAULT nextval('mascota_id_seq'::regclass),
    nombre text COLLATE pg_catalog."default" NOT NULL,
    edad integer NOT NULL,
    color text COLLATE pg_catalog."default" NOT NULL,
    tamanio text COLLATE pg_catalog."default" NOT NULL,
    sexo text COLLATE pg_catalog."default" NOT NULL,
    raza text COLLATE pg_catalog."default" NOT NULL,
    esterilizado boolean NOT NULL,
    descripcion text COLLATE pg_catalog."default" NOT NULL,
    foto text COLLATE pg_catalog."default" NOT NULL,
    estado boolean NOT NULL DEFAULT true,
    especie text COLLATE pg_catalog."default" NOT NULL,
    registro integer NOT NULL,
    "fechaRegistro" date NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "estadoRegistro" text COLLATE pg_catalog."default" NOT NULL DEFAULT 'ENVIADO'::text,
    "fechaRevision" date,
    "tipoRegistro" text COLLATE pg_catalog."default" DEFAULT 'VIRTUAL'::text,
    CONSTRAINT mascota_pkey PRIMARY KEY (id)
)
//
////
CREATE TABLE public."mascotaObservacion"
(
    "idMascota" integer NOT NULL,
    "idObservacion" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "mascotaObservacion_pkey" PRIMARY KEY ("idMascota", "idObservacion"),
    CONSTRAINT "mascotaObservacion_idMascota_fkey" FOREIGN KEY ("idMascota")
        REFERENCES public.mascota (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "mascotaObservacion_idObservacion_fkey" FOREIGN KEY ("idObservacion")
        REFERENCES public.observacion (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
/////
CREATE TABLE public.modulo
(
    id integer NOT NULL DEFAULT nextval('modulo_id_seq'::regclass),
    url text COLLATE pg_catalog."default" NOT NULL,
    descripcion text COLLATE pg_catalog."default",
    nombre text COLLATE pg_catalog."default" NOT NULL,
    estado boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT modulo_pkey PRIMARY KEY (id)
)
CREATE TABLE public.observacion
(
    id integer NOT NULL DEFAULT nextval('observacion_id_seq'::regclass),
    asunto text COLLATE pg_catalog."default" NOT NULL,
    descripcion text COLLATE pg_catalog."default" NOT NULL,
    estado boolean NOT NULL DEFAULT true,
    "fechaEmision" date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "estadoSubsanacion" text COLLATE pg_catalog."default" NOT NULL DEFAULT 'POR SUBSANAR'::text,
    CONSTRAINT observacion_pkey PRIMARY KEY (id)
)
/////
CREATE TABLE public.pagina
(
    id integer NOT NULL DEFAULT nextval('pagina_id_seq'::regclass),
    url text COLLATE pg_catalog."default" NOT NULL,
    descripcion text COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idModulo" integer,
    CONSTRAINT pagina_pkey PRIMARY KEY (id),
    CONSTRAINT "pagina_idModulo_fkey" FOREIGN KEY ("idModulo")
        REFERENCES public.modulo (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
CREATE TABLE public.persona
(
    id integer NOT NULL DEFAULT nextval('persona_id_seq'::regclass),
    "tipoDocumento" character(3) COLLATE pg_catalog."default" NOT NULL,
    "numeroDocumento" character(15) COLLATE pg_catalog."default" NOT NULL,
    nombres text COLLATE pg_catalog."default" NOT NULL,
    "apellidoPaterno" text COLLATE pg_catalog."default" NOT NULL,
    "apellidoMaterno" text COLLATE pg_catalog."default" NOT NULL,
    "nombreCompleto" text COLLATE pg_catalog."default",
    direccion text COLLATE pg_catalog."default" NOT NULL,
    "direccionAlternativa" text COLLATE pg_catalog."default",
    correo text COLLATE pg_catalog."default",
    telefono character(10) COLLATE pg_catalog."default",
    celular character(10) COLLATE pg_catalog."default",
    estado boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "fechaNacimiento" date,
    sexo text COLLATE pg_catalog."default",
    edad text COLLATE pg_catalog."default",
    CONSTRAINT persona_pkey PRIMARY KEY (id)
)
/////
CREATE TABLE public."personaBeneficiario"
(
    id integer NOT NULL DEFAULT nextval('"personaBeneficiario_id_seq"'::regclass),
    "tipoDocumento" text COLLATE pg_catalog."default" NOT NULL DEFAULT 'DNI'::text,
    "numeroDocumento" text COLLATE pg_catalog."default" NOT NULL,
    "apellidoPaterno" text COLLATE pg_catalog."default" NOT NULL,
    "apellidoMaterno" text COLLATE pg_catalog."default" NOT NULL,
    nombres text COLLATE pg_catalog."default" NOT NULL,
    direccion text COLLATE pg_catalog."default" NOT NULL,
    zona text COLLATE pg_catalog."default",
    manzana text COLLATE pg_catalog."default",
    lote text COLLATE pg_catalog."default",
    kilometro text COLLATE pg_catalog."default",
    comite text COLLATE pg_catalog."default",
    sector text COLLATE pg_catalog."default",
    "tipoPoblado" text COLLATE pg_catalog."default",
    "estadoCivil" text COLLATE pg_catalog."default",
    "estadoEntrega" boolean NOT NULL DEFAULT false,
    "fechaEntrega" timestamp with time zone NOT NULL,
    estado boolean NOT NULL DEFAULT true,
    "tipoFamiliar" text COLLATE pg_catalog."default" NOT NULL DEFAULT 'TITULAR'::text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idAsociacion" integer,
    usuario text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    CONSTRAINT "personaBeneficiario_pkey" PRIMARY KEY (id),
    CONSTRAINT "personaBeneficiario_idAsociacion_fkey" FOREIGN KEY ("idAsociacion")
        REFERENCES public.asociacion (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
//////
CREATE TABLE public."propietarioMascota"
(
    id integer NOT NULL DEFAULT nextval('"propietarioMascota_id_seq"'::regclass),
    tipo text COLLATE pg_catalog."default" NOT NULL,
    estado boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idPersona" integer,
    "idMascota" integer,
    CONSTRAINT "propietarioMascota_pkey" PRIMARY KEY (id),
    CONSTRAINT "propietarioMascota_idPersona_idMascota_key" UNIQUE ("idPersona", "idMascota"),
    CONSTRAINT "propietarioMascota_idMascota_fkey" FOREIGN KEY ("idMascota")
        REFERENCES public.mascota (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "propietarioMascota_idPersona_fkey" FOREIGN KEY ("idPersona")
        REFERENCES public.persona (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
CREATE TABLE public.sede
(
    id integer NOT NULL DEFAULT nextval('sede_id_seq'::regclass),
    nombre text COLLATE pg_catalog."default" NOT NULL,
    descripcion text COLLATE pg_catalog."default",
    direccion text COLLATE pg_catalog."default",
    estado boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idEntidad" integer,
    CONSTRAINT sede_pkey PRIMARY KEY (id),
    CONSTRAINT "sede_idEntidad_fkey" FOREIGN KEY ("idEntidad")
        REFERENCES public.entidad (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
CREATE TABLE public."tipoDocumento"
(
    id integer NOT NULL DEFAULT nextval('"tipoDocumento_id_seq"'::regclass),
    nombre character(30) COLLATE pg_catalog."default" NOT NULL,
    estado boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "tipoDocumento_pkey" PRIMARY KEY (id)
)

CREATE TABLE public.usuario
(
    id integer NOT NULL DEFAULT nextval('usuario_id_seq'::regclass),
    usuario text COLLATE pg_catalog."default" NOT NULL,
    nombres character varying(25) COLLATE pg_catalog."default" NOT NULL,
    apellidos character varying(25) COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default",
    telefono character varying(20) COLLATE pg_catalog."default",
    tipo smallint NOT NULL,
    usu_reniec character varying(8) COLLATE pg_catalog."default",
    hash text COLLATE pg_catalog."default" NOT NULL,
    salt text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    estado boolean NOT NULL DEFAULT true,
    CONSTRAINT usuario_pkey PRIMARY KEY (id)
)

