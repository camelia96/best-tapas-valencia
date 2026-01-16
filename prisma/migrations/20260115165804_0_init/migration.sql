-- CreateTable
CREATE TABLE "bares" (
    "id" SMALLSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" VARCHAR NOT NULL,
    "direccion" VARCHAR,
    "web_url" VARCHAR,
    "coordinadas_latitud" DOUBLE PRECISION,
    "coordinadas_longitud" DOUBLE PRECISION,
    "barrio_id" SMALLINT NOT NULL,

    CONSTRAINT "bar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barrios" (
    "id" SMALLSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" VARCHAR NOT NULL,

    CONSTRAINT "barrios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SMALLSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" VARCHAR,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags_tapas" (
    "id" SMALLSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tapa_id" SMALLINT,
    "tag_id" INTEGER,

    CONSTRAINT "tags_tapas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SMALLSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" VARCHAR NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "email" VARCHAR(256),

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tapas" (
    "id" SMALLSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" VARCHAR NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "descripcion" VARCHAR,
    "imagen_url" VARCHAR,
    "vistos" INTEGER,
    "puntuacion" INTEGER,
    "bar_id" SMALLINT NOT NULL,
    "categoria_id" SMALLINT NOT NULL,

    CONSTRAINT "tapas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bares" ADD CONSTRAINT "bares_barrio_id_fkey" FOREIGN KEY ("barrio_id") REFERENCES "barrios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tags_tapas" ADD CONSTRAINT "tags_tapas_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tags_tapas" ADD CONSTRAINT "tags_tapas_tapa_id_fkey" FOREIGN KEY ("tapa_id") REFERENCES "tapas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tapas" ADD CONSTRAINT "tapas_bar_id_fkey" FOREIGN KEY ("bar_id") REFERENCES "bares"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tapas" ADD CONSTRAINT "tapas_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
