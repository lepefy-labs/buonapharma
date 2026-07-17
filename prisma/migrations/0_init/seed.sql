-- prisma/seed.sql
-- Dati di prova per popolare il forum (categorie, utenti demo, post, commenti).
-- Idempotente: ogni INSERT usa ON CONFLICT ... DO NOTHING, stesso standard di
-- prisma/migrations/0_init, quindi rieseguibile senza duplicare righe.
--
-- Password in chiaro per tutti gli utenti demo (SOLO per test locale): Test1234!
-- (hash bcrypt precomputato, non riutilizzare in produzione)

-- CreateCategories
INSERT INTO "Category" ("id", "space", "slug", "nameFr", "nameEn")
VALUES
  ('seed_category_interactions', 'PHARMACIENS', 'interactions-medicamenteuses', 'Interactions médicamenteuses', 'Drug interactions'),
  ('seed_category_actualites', 'PHARMACIENS', 'actualites-pharmaceutiques', 'Actualités pharmaceutiques', 'Pharmaceutical news'),
  ('seed_category_questions', 'PATIENTS', 'questions-generales', 'Questions générales', 'General questions'),
  ('seed_category_grossesse', 'PATIENTS', 'grossesse-allaitement', 'Grossesse et allaitement', 'Pregnancy and breastfeeding')
ON CONFLICT ("slug") DO NOTHING;

-- CreateUsers
-- Password en clair pour les 3 comptes de démo (test uniquement) : Test1234!
INSERT INTO "User" ("id", "email", "passwordHash", "name", "role", "locale", "licenseNumber", "verifiedAt", "updatedAt")
VALUES
  ('seed_user_pharmacist', 'pharmacien.demo@buonapharma.com', '$2b$10$wwxcZWV3iY00ZvNkuc7ZROvRtxSjXsJCRjnkManiiUS11IdZni6IG', 'Dr. Amina Fotso', 'PHARMACIST_VERIFIED', 'FR', 'ONPC-2024-00123', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("email") DO NOTHING;

INSERT INTO "User" ("id", "email", "passwordHash", "name", "role", "locale", "updatedAt")
VALUES
  ('seed_user_patient', 'patient.demo@buonapharma.com', '$2b$10$wwxcZWV3iY00ZvNkuc7ZROvRtxSjXsJCRjnkManiiUS11IdZni6IG', 'Jean Mballa', 'PATIENT', 'FR', CURRENT_TIMESTAMP)
ON CONFLICT ("email") DO NOTHING;

INSERT INTO "User" ("id", "email", "passwordHash", "name", "role", "locale", "updatedAt")
VALUES
  ('seed_user_admin', 'admin.demo@buonapharma.com', '$2b$10$wwxcZWV3iY00ZvNkuc7ZROvRtxSjXsJCRjnkManiiUS11IdZni6IG', 'Admin BuonaPharma', 'ADMIN', 'FR', CURRENT_TIMESTAMP)
ON CONFLICT ("email") DO NOTHING;

-- CreatePosts (space PHARMACIENS)
INSERT INTO "Post" ("id", "space", "categoryId", "authorId", "title", "body", "originalLocale", "isAnswered", "updatedAt")
VALUES
  (
    'seed_post_01',
    'PHARMACIENS',
    'seed_category_interactions',
    'seed_user_pharmacist',
    'Interaction entre anticoagulants et antalgiques courants',
    'Bonjour à tous, je souhaiterais échanger avec des confrères sur la prise en charge officinale des patients sous anticoagulants oraux qui demandent un antalgique en vente libre. Quelles sont vos pratiques de conseil au comptoir dans ce type de situation, et quels points de vigilance mettez-vous en avant avant d''orienter le patient vers son médecin traitant ?',
    'FR',
    false,
    CURRENT_TIMESTAMP
  ),
  (
    'seed_post_02',
    'PHARMACIENS',
    'seed_category_actualites',
    'seed_user_pharmacist',
    'Nouvelles recommandations sur la dispensation en officine',
    'Quelqu''un a-t-il déjà pris connaissance des dernières recommandations professionnelles concernant la dispensation en officine ? Je serais intéressée d''échanger sur leur mise en application concrète au quotidien dans nos pharmacies respectives.',
    'FR',
    false,
    CURRENT_TIMESTAMP
  )
ON CONFLICT ("id") DO NOTHING;

-- CreatePosts (space PATIENTS)
INSERT INTO "Post" ("id", "space", "categoryId", "authorId", "title", "body", "originalLocale", "isAnswered", "updatedAt")
VALUES
  (
    'seed_post_03',
    'PATIENTS',
    'seed_category_grossesse',
    'seed_user_patient',
    'Puis-je prendre du paracétamol enceinte ?',
    'Bonjour, je suis enceinte de quelques mois et j''ai mal à la tête depuis deux jours. Est-ce que le paracétamol est habituellement considéré comme sûr pendant la grossesse ? Merci pour vos conseils.',
    'FR',
    true,
    CURRENT_TIMESTAMP
  ),
  (
    'seed_post_04',
    'PATIENTS',
    'seed_category_questions',
    'seed_user_patient',
    'Quels sont les horaires d''ouverture habituels des pharmacies partenaires ?',
    'Bonjour, je me demandais si les pharmacies partenaires de BuonaPharma avaient généralement les mêmes horaires d''ouverture, notamment le week-end. Merci d''avance pour vos retours.',
    'FR',
    false,
    CURRENT_TIMESTAMP
  ),
  (
    'seed_post_05',
    'PATIENTS',
    'seed_category_questions',
    'seed_user_patient',
    'Comment bien conserver ses médicaments à la maison ?',
    'Bonjour, j''aimerais savoir s''il existe des règles simples à suivre pour bien conserver ses médicaments chez soi (température, humidité, à l''abri de la lumière...). Avez-vous des conseils pratiques ?',
    'FR',
    true,
    CURRENT_TIMESTAMP
  )
ON CONFLICT ("id") DO NOTHING;

-- CreateComments (réponses des pharmaciens aux posts PATIENTS répondus)
INSERT INTO "Comment" ("id", "postId", "authorId", "body", "originalLocale", "isFromPharmacist")
VALUES
  (
    'seed_comment_01',
    'seed_post_03',
    'seed_user_pharmacist',
    'Bonjour, le paracétamol est généralement l''antalgique de première intention envisagé pendant la grossesse, aux doses usuelles et sur une durée limitée. Cela dit, chaque situation est particulière : je vous invite à confirmer ce point avec votre médecin ou votre pharmacien habituel avant toute prise, surtout si les maux de tête persistent.',
    'FR',
    true
  ),
  (
    'seed_comment_02',
    'seed_post_05',
    'seed_user_pharmacist',
    'Bonjour, en règle générale il est conseillé de conserver les médicaments dans un endroit sec, à température ambiante stable et à l''abri de la lumière directe, en évitant la salle de bain. Certains produits nécessitent toutefois des conditions spécifiques (réfrigérateur, etc.) : n''hésitez pas à vérifier la notice ou à en parler avec votre pharmacien habituel en cas de doute.',
    'FR',
    true
  )
ON CONFLICT ("id") DO NOTHING;
