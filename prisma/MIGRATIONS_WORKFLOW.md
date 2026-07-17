# Workflow migration Prisma — BuonaPharma

Questo progetto NON esegue mai `prisma migrate deploy` in automatico.
Il database è gestito manualmente da Robertin: ogni modifica di schema
genera un file SQL che lui esegue a mano su Neon.

Quando prisma/schema.prisma cambia:

1. Genera una nuova cartella in prisma/migrations/ con nome
   <timestamp>_<descrizione breve>, es. 20260720_add_post_attachments
2. Genera l'SQL con:
   npx prisma migrate diff \
     --from-migrations prisma/migrations \
     --to-schema-datamodel prisma/schema.prisma \
     --script \
     --shadow-database-url "" \
     > prisma/migrations/<nuova_cartella>/migration.sql
   (se il comando richiede comunque una shadow database e fallisce in
   locale senza DB, usa in alternativa --from-schema-datamodel puntando
   all'ultimo schema noto e documenta a mano il diff nel file SQL)
3. NON eseguire mai `prisma migrate dev` o `prisma migrate deploy` —
   generano solo l'SQL, non lo applicano.
4. Consegna sempre il file .sql generato in evidenza nello zip, così
   Robertin sa esattamente cosa eseguire su Neon.
