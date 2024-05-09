--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-10 01:00:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 114688)
-- Name: public; Type: SCHEMA; Schema: -; Owner: UltraMarket_owner
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO "UltraMarket_owner";

--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: UltraMarket_owner
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 850 (class 1247 OID 114698)
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: UltraMarket_owner
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'WaitingForPayment',
    'Pending',
    'Packiging',
    'Shipping',
    'Delivered',
    'Canceled'
);


ALTER TYPE public."OrderStatus" OWNER TO "UltraMarket_owner";

--
-- TOC entry 847 (class 1247 OID 114690)
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: UltraMarket_owner
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'Pending',
    'Payed',
    'Canceled'
);


ALTER TYPE public."PaymentStatus" OWNER TO "UltraMarket_owner";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 114738)
-- Name: Category; Type: TABLE; Schema: public; Owner: UltraMarket_owner
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "shopItemId" integer
);


ALTER TABLE public."Category" OWNER TO "UltraMarket_owner";

--
-- TOC entry 219 (class 1259 OID 114737)
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: UltraMarket_owner
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO "UltraMarket_owner";

--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 219
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: UltraMarket_owner
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- TOC entry 221 (class 1259 OID 114747)
-- Name: Order; Type: TABLE; Schema: public; Owner: UltraMarket_owner
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "paymentStatus" public."PaymentStatus" NOT NULL,
    "orderStatus" public."OrderStatus" NOT NULL,
    name text,
    address text,
    zip text,
    city text,
    country text,
    phone text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Order" OWNER TO "UltraMarket_owner";

--
-- TOC entry 216 (class 1259 OID 114719)
-- Name: Organization; Type: TABLE; Schema: public; Owner: UltraMarket_owner
--

CREATE TABLE public."Organization" (
    id text NOT NULL,
    "ownerId" text NOT NULL,
    logo text,
    name text,
    vat text,
    address text,
    phone text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Organization" OWNER TO "UltraMarket_owner";

--
-- TOC entry 218 (class 1259 OID 114728)
-- Name: ShopItem; Type: TABLE; Schema: public; Owner: UltraMarket_owner
--

CREATE TABLE public."ShopItem" (
    id integer NOT NULL,
    "organizationId" text NOT NULL,
    name text NOT NULL,
    "shortDescription" text NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    images text[],
    "orderId" text,
    stock integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ShopItem" OWNER TO "UltraMarket_owner";

--
-- TOC entry 217 (class 1259 OID 114727)
-- Name: ShopItem_id_seq; Type: SEQUENCE; Schema: public; Owner: UltraMarket_owner
--

CREATE SEQUENCE public."ShopItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ShopItem_id_seq" OWNER TO "UltraMarket_owner";

--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 217
-- Name: ShopItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: UltraMarket_owner
--

ALTER SEQUENCE public."ShopItem_id_seq" OWNED BY public."ShopItem".id;


--
-- TOC entry 215 (class 1259 OID 114711)
-- Name: User; Type: TABLE; Schema: public; Owner: UltraMarket_owner
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO "UltraMarket_owner";

--
-- TOC entry 222 (class 1259 OID 114755)
-- Name: _CategoryToShopItem; Type: TABLE; Schema: public; Owner: UltraMarket_owner
--

CREATE TABLE public."_CategoryToShopItem" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CategoryToShopItem" OWNER TO "UltraMarket_owner";

--
-- TOC entry 3209 (class 2604 OID 114741)
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- TOC entry 3207 (class 2604 OID 114731)
-- Name: ShopItem id; Type: DEFAULT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."ShopItem" ALTER COLUMN id SET DEFAULT nextval('public."ShopItem_id_seq"'::regclass);


--
-- TOC entry 3380 (class 0 OID 114738)
-- Dependencies: 220
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: UltraMarket_owner
--

INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (1, 'Gyermek', '2024-05-09 16:46:57.6', '2024-05-09 16:46:57.6', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (2, 'Kert', '2024-05-09 16:46:58.064', '2024-05-09 16:46:58.064', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (3, 'Zene', '2024-05-09 16:46:58.23', '2024-05-09 16:46:58.23', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (4, 'Otthon', '2024-05-09 16:46:58.405', '2024-05-09 16:46:58.405', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (5, 'Számítógép', '2024-05-09 16:46:58.57', '2024-05-09 16:46:58.57', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (6, 'Film', '2024-05-09 16:46:59.092', '2024-05-09 16:46:59.092', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (7, 'Játékszer', '2024-05-09 16:46:59.888', '2024-05-09 16:46:59.888', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (8, 'Szabadban', '2024-05-09 16:47:00.231', '2024-05-09 16:47:00.231', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (9, 'Ipari', '2024-05-09 16:47:00.712', '2024-05-09 16:47:00.712', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (10, 'Sport', '2024-05-09 16:47:01.037', '2024-05-09 16:47:01.037', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (11, 'Ruházat', '2024-05-09 16:47:01.499', '2024-05-09 16:47:01.499', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (12, 'Egészség', '2024-05-09 16:47:01.668', '2024-05-09 16:47:01.668', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (13, 'Baba', '2024-05-09 16:47:01.858', '2024-05-09 16:47:01.858', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (14, 'Szépség', '2024-05-09 16:47:02.184', '2024-05-09 16:47:02.184', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (15, 'Ékszer', '2024-05-09 16:47:02.346', '2024-05-09 16:47:02.346', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (16, 'Könyv', '2024-05-09 16:47:02.955', '2024-05-09 16:47:02.955', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (17, 'Autó', '2024-05-09 16:47:03.438', '2024-05-09 16:47:03.438', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (18, 'Szerszám', '2024-05-09 16:47:03.766', '2024-05-09 16:47:03.766', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (19, 'Játék', '2024-05-09 16:47:03.937', '2024-05-09 16:47:03.937', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (20, 'Élelmiszer', '2024-05-09 16:47:04.688', '2024-05-09 16:47:04.688', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (21, 'Elektronika', '2024-05-09 16:47:06.038', '2024-05-09 16:47:06.038', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (22, 'Test', '2024-05-09 22:41:58.222', '2024-05-09 22:41:58.222', NULL);
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt", "shopItemId") VALUES (23, 'Tesdt3', '2024-05-09 22:43:43.639', '2024-05-09 22:43:43.639', NULL);


--
-- TOC entry 3381 (class 0 OID 114747)
-- Dependencies: 221
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: UltraMarket_owner
--

INSERT INTO public."Order" (id, "userId", "paymentStatus", "orderStatus", name, address, zip, city, country, phone, "createdAt", "updatedAt") VALUES ('cs_test_b1tVSOQJqR0GGh1Kjew3V77TKQatgpVwQpV9ibBOuZW1BwpbccZWNKoTcL', 'user_2fLST3UGHEDKEgQE886oJm34bhb', 'Payed', 'Pending', 'Név', 'FAsor 12null', '1234', 'Budapest', 'HU', '+36201234567', '2024-05-09 19:44:17.962', '2024-05-09 19:44:49.144');
INSERT INTO public."Order" (id, "userId", "paymentStatus", "orderStatus", name, address, zip, city, country, phone, "createdAt", "updatedAt") VALUES ('cs_test_b1wigSdQ7g0OTvnZ1qLl5k1dgPvw98XEIXYEZ12Y3qvEctVHpVZaBVZIyq', 'user_2fLST3UGHEDKEgQE886oJm34bhb', 'Canceled', 'Canceled', NULL, 'undefinedundefined', NULL, NULL, NULL, NULL, '2024-05-09 20:04:48.083', '2024-05-09 20:05:18.556');
INSERT INTO public."Order" (id, "userId", "paymentStatus", "orderStatus", name, address, zip, city, country, phone, "createdAt", "updatedAt") VALUES ('cs_test_a1oldYS8AnvthzkX26WGf1VySmn25Sy8YT71i7kw3pbmzIRxmApE1ecX86', 'user_2fNGyDffJyvndJ5vl3z7Ta10P0U', 'Pending', 'WaitingForPayment', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-09 20:07:25.155', '2024-05-09 20:07:25.155');
INSERT INTO public."Order" (id, "userId", "paymentStatus", "orderStatus", name, address, zip, city, country, phone, "createdAt", "updatedAt") VALUES ('cs_test_b1XjMTPAS90j5CZSIrmAKvMFln904XnCyRw0PENuWz6DApzqR9rjU1nCBa', 'user_2fLST3UGHEDKEgQE886oJm34bhb', 'Canceled', 'Canceled', NULL, 'undefinedundefined', NULL, NULL, NULL, NULL, '2024-05-09 20:11:22.235', '2024-05-09 20:11:28.494');
INSERT INTO public."Order" (id, "userId", "paymentStatus", "orderStatus", name, address, zip, city, country, phone, "createdAt", "updatedAt") VALUES ('cs_test_b1egl1sdBuZfLB6YzHQVoP1izseDKhQHiFMX7tDxGX5YPKvDZbmCWRV8Rl', 'user_2fLST3UGHEDKEgQE886oJm34bhb', 'Payed', 'Packiging', 'Név', 'FAsor 12null', '1234', 'Budapest', 'HU', '+36201234567', '2024-05-09 18:39:31.819', '2024-05-09 19:10:21.592');
INSERT INTO public."Order" (id, "userId", "paymentStatus", "orderStatus", name, address, zip, city, country, phone, "createdAt", "updatedAt") VALUES ('cs_test_b1OJ4f6FxuxzhfebCfZaILhmzr1j6CN3IvqN3x2YjgC8bEDiSvxWMizBod', 'user_2fLST3UGHEDKEgQE886oJm34bhb', 'Payed', 'Pending', 'Név', 'FAsor 12null', '1234', 'Budapest', 'HU', NULL, '2024-05-09 18:07:35.761', '2024-05-09 19:12:33.241');
INSERT INTO public."Order" (id, "userId", "paymentStatus", "orderStatus", name, address, zip, city, country, phone, "createdAt", "updatedAt") VALUES ('cs_test_b1i2Q224ThOwHrduyszvTLrR8adjkweI0BbWiMPimBDaiZYz2qNxdLAFmx', 'user_2fLST3UGHEDKEgQE886oJm34bhb', 'Payed', 'Pending', 'Név', 'FAsor 12null', '1234', 'Budapest', 'HU', '+36201234567', '2024-05-09 18:43:26.139', '2024-05-09 19:12:44.065');


--
-- TOC entry 3376 (class 0 OID 114719)
-- Dependencies: 216
-- Data for Name: Organization; Type: TABLE DATA; Schema: public; Owner: UltraMarket_owner
--

INSERT INTO public."Organization" (id, "ownerId", logo, name, vat, address, phone, "createdAt", "updatedAt") VALUES ('org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'user_2fLST3UGHEDKEgQE886oJm34bhb', 'https://loremflickr.com/640/480?lock=2043296255836160', 'Jónás és Tsa. Bt.', '3091072758579200', '577 Balog Shore', '0036704654134', '2024-05-09 16:46:57.434', '2024-05-09 16:46:57.434');


--
-- TOC entry 3378 (class 0 OID 114728)
-- Dependencies: 218
-- Data for Name: ShopItem; Type: TABLE DATA; Schema: public; Owner: UltraMarket_owner
--

INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (4, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Engedélyezett Pamut Szék', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'Az autó elrendezése az első motorból áll, a motor hátuljára szerelt áthelyezett kardántengelyű típusú sebességváltókkal és négykerék-hajtással', 43100, '{https://loremflickr.com/640/480?lock=4446720054263808}', NULL, 7, '2024-05-09 16:46:58.23', '2024-05-09 16:46:58.23');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (6, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Ergonomikus Gránit Cipő', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 98600, '{https://loremflickr.com/640/480?lock=4679106002157568}', NULL, 75, '2024-05-09 16:46:58.57', '2024-05-09 16:46:58.57');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (7, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Sima Friss Szalonna', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 60400, '{https://loremflickr.com/640/480?lock=4909536137707520}', NULL, 0, '2024-05-09 16:46:58.76', '2024-05-09 16:46:58.76');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (8, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Hihetetlen Pamut Csirke', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 'A futball edzésre és szabadidős célokra is jó', 68200, '{https://picsum.photos/seed/gvsFgAPCgF/640/480}', NULL, 17, '2024-05-09 16:46:58.928', '2024-05-09 16:46:58.928');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (9, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Hihetetlen Puha Saláta', 'A futball edzésre és szabadidős célokra is jó', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 24400, '{https://loremflickr.com/640/480?lock=1749404897771520}', NULL, 21, '2024-05-09 16:46:59.092', '2024-05-09 16:46:59.092');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (10, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Sima Friss Billentyűzet', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'Az autó elrendezése az első motorból áll, a motor hátuljára szerelt áthelyezett kardántengelyű típusú sebességváltókkal és négykerék-hajtással', 62800, '{https://picsum.photos/seed/Z1tAjyv9h/640/480}', NULL, 70, '2024-05-09 16:46:59.279', '2024-05-09 16:46:59.279');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (11, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Hihetetlen Gránit Csirke', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 91000, '{https://picsum.photos/seed/omVRQI/640/480}', NULL, 4, '2024-05-09 16:46:59.437', '2024-05-09 16:46:59.437');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (12, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Hihetetlen Pamut Ing', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 55000, '{https://picsum.photos/seed/Z0mDL3A2/640/480}', NULL, 15, '2024-05-09 16:46:59.588', '2024-05-09 16:46:59.588');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (13, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Fantasztikus Puha Bicikli', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 'A futball edzésre és szabadidős célokra is jó', 36800, '{https://loremflickr.com/640/480?lock=7867808977256448}', NULL, 67, '2024-05-09 16:46:59.739', '2024-05-09 16:46:59.739');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (14, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Ergonomikus Beton Billentyűzet', 'Új ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Grafika, OS 10 Home, OS Office A & J 2016', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 88500, '{https://loremflickr.com/640/480?lock=4145459197116416}', NULL, 85, '2024-05-09 16:46:59.888', '2024-05-09 16:46:59.888');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (15, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Csodás Puha Pizza', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 56000, '{https://loremflickr.com/640/480?lock=6106209589395456}', NULL, 35, '2024-05-09 16:47:00.07', '2024-05-09 16:47:00.07');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (16, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Rusztikus Pamut Szalonna', 'A futball edzésre és szabadidős célokra is jó', 'A futball edzésre és szabadidős célokra is jó', 5900, '{https://loremflickr.com/640/480?lock=4309575559806976}', NULL, 58, '2024-05-09 16:47:00.231', '2024-05-09 16:47:00.231');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (17, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Sima Műanyag Szék', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 92000, '{https://picsum.photos/seed/Ulcxirwh/640/480}', NULL, 99, '2024-05-09 16:47:00.412', '2024-05-09 16:47:00.412');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (18, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Gyönyörű Fém Törölköző', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 51800, '{https://picsum.photos/seed/oDJS9aB/640/480}', NULL, 35, '2024-05-09 16:47:00.564', '2024-05-09 16:47:00.564');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (5, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Márka nélküli Pamut Sajt', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 89400, '{https://picsum.photos/seed/vvsCz7ijup/640/480}', NULL, 100, '2024-05-09 16:46:58.405', '2024-05-09 22:43:43.879');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (19, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kifinomult Acél Autó', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 42900, '{https://loremflickr.com/640/480?lock=1842358289170432}', NULL, 92, '2024-05-09 16:47:00.712', '2024-05-09 16:47:00.712');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (20, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Intelligens Fa Szék', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 29700, '{https://picsum.photos/seed/ez3s4KtJv3/640/480}', NULL, 25, '2024-05-09 16:47:00.894', '2024-05-09 16:47:00.894');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (21, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Fantasztikus Fa Szalonna', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'Új ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Grafika, OS 10 Home, OS Office A & J 2016', 78100, '{https://picsum.photos/seed/GjZFp6/640/480}', NULL, 49, '2024-05-09 16:47:01.037', '2024-05-09 16:47:01.037');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (22, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Sima Fém Ing', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 44100, '{https://loremflickr.com/640/480?lock=3947084279447552}', NULL, 61, '2024-05-09 16:47:01.211', '2024-05-09 16:47:01.211');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (23, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Gyönyörű Acél Saláta', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 58300, '{https://picsum.photos/seed/tkaV3K9zk/640/480}', NULL, 7, '2024-05-09 16:47:01.356', '2024-05-09 16:47:01.356');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (24, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kifinomult Beton Szalonna', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'A futball edzésre és szabadidős célokra is jó', 61700, '{https://picsum.photos/seed/745u8Ho5qR/640/480}', NULL, 12, '2024-05-09 16:47:01.499', '2024-05-09 16:47:01.499');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (25, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Intelligens Gránit Szalonna', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 37100, '{https://loremflickr.com/640/480?lock=8305796569890816}', NULL, 0, '2024-05-09 16:47:01.668', '2024-05-09 16:47:01.668');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (26, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Csodás Gránit Virsli', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 56600, '{https://picsum.photos/seed/chIgnGF/640/480}', NULL, 59, '2024-05-09 16:47:01.858', '2024-05-09 16:47:01.858');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (27, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Praktikus Acél Csirke', 'Az autó elrendezése az első motorból áll, a motor hátuljára szerelt áthelyezett kardántengelyű típusú sebességváltókkal és négykerék-hajtással', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 74500, '{https://loremflickr.com/640/480?lock=4259621629853696}', NULL, 97, '2024-05-09 16:47:02.036', '2024-05-09 16:47:02.036');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (28, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Ergonomikus Acél Autó', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 65400, '{https://picsum.photos/seed/KLvzV6iHuE/640/480}', NULL, 32, '2024-05-09 16:47:02.184', '2024-05-09 16:47:02.184');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (29, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Intelligens Gránit Kesztyű', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 42600, '{https://loremflickr.com/640/480?lock=7099358879154176}', NULL, 5, '2024-05-09 16:47:02.346', '2024-05-09 16:47:02.346');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (30, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Engedélyezett Fa Szappan', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 32200, '{https://picsum.photos/seed/Kbxp6ZueaU/640/480}', NULL, 53, '2024-05-09 16:47:02.51', '2024-05-09 16:47:02.51');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (31, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Általános Gránit Kesztyű', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 50300, '{https://loremflickr.com/640/480?lock=2825278709563392}', NULL, 13, '2024-05-09 16:47:02.664', '2024-05-09 16:47:02.664');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (33, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Fantasztikus Műanyag Nadrág', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 98100, '{https://picsum.photos/seed/wCy07uMZ/640/480}', NULL, 7, '2024-05-09 16:47:02.955', '2024-05-09 16:47:02.955');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (34, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Intelligens Gránit Kalap', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 96400, '{https://loremflickr.com/640/480?lock=3078936456069120}', NULL, 10, '2024-05-09 16:47:03.116', '2024-05-09 16:47:03.116');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (35, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Általános Beton Bicikli', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 44400, '{https://picsum.photos/seed/ipTbAXIEG/640/480}', NULL, 2, '2024-05-09 16:47:03.285', '2024-05-09 16:47:03.285');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (36, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Gyönyörű Acél Kalap', 'Az autó elrendezése az első motorból áll, a motor hátuljára szerelt áthelyezett kardántengelyű típusú sebességváltókkal és négykerék-hajtással', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 38100, '{https://loremflickr.com/640/480?lock=5078768158769152}', NULL, 23, '2024-05-09 16:47:03.438', '2024-05-09 16:47:03.438');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (37, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Fantasztikus Műanyag Bicikli', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'Új ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Grafika, OS 10 Home, OS Office A & J 2016', 98400, '{https://loremflickr.com/640/480?lock=5185136769368064}', NULL, 30, '2024-05-09 16:47:03.604', '2024-05-09 16:47:03.604');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (38, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Általános Puha Labda', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 40200, '{https://loremflickr.com/640/480?lock=6894787009445888}', NULL, 36, '2024-05-09 16:47:03.766', '2024-05-09 16:47:03.766');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (39, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Csodás Gránit Billentyűzet', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 54900, '{https://picsum.photos/seed/iiDo1PT/640/480}', NULL, 96, '2024-05-09 16:47:03.937', '2024-05-09 16:47:03.937');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (42, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kifinomult Fa Számítógép', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'Az autó elrendezése az első motorból áll, a motor hátuljára szerelt áthelyezett kardántengelyű típusú sebességváltókkal és négykerék-hajtással', 83900, '{https://picsum.photos/seed/1xI40z/640/480}', NULL, 22, '2024-05-09 16:47:04.395', '2024-05-09 16:47:04.395');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (43, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kifinomult Fém Nadrág', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 35500, '{https://picsum.photos/seed/zCdXzhEfi/640/480}', NULL, 90, '2024-05-09 16:47:04.543', '2024-05-09 16:47:04.543');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (44, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kicsi Fagyott Cipő', 'A futball edzésre és szabadidős célokra is jó', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 58800, '{https://loremflickr.com/640/480?lock=8541098028826624}', NULL, 34, '2024-05-09 16:47:04.688', '2024-05-09 16:47:04.688');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (45, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Általános Acél Kesztyű', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 48100, '{https://picsum.photos/seed/Jc53HpSnxR/640/480}', NULL, 47, '2024-05-09 16:47:04.871', '2024-05-09 16:47:04.871');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (46, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kicsi Fém Kalap', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 90500, '{https://picsum.photos/seed/zOPkllUo/640/480}', NULL, 39, '2024-05-09 16:47:05.012', '2024-05-09 16:47:05.012');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (47, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Fantasztikus Beton Számítógép', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 93800, '{https://loremflickr.com/640/480?lock=8178636725157888}', NULL, 30, '2024-05-09 16:47:05.154', '2024-05-09 16:47:05.154');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (48, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Márka nélküli Műanyag Cipő', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 20700, '{https://loremflickr.com/640/480?lock=3029477177163776}', NULL, 42, '2024-05-09 16:47:05.296', '2024-05-09 16:47:05.296');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (49, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Engedélyezett Friss Hal', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'A futball edzésre és szabadidős célokra is jó', 71000, '{https://loremflickr.com/640/480?lock=8641013595766784}', NULL, 84, '2024-05-09 16:47:05.441', '2024-05-09 16:47:05.441');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (50, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kézzel készített Fa Kalap', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 30200, '{https://picsum.photos/seed/k5xBz/640/480}', NULL, 57, '2024-05-09 16:47:05.594', '2024-05-09 16:47:05.594');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (51, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Intelligens Fém Csirke', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 55300, '{https://loremflickr.com/640/480?lock=4548301057687552}', NULL, 74, '2024-05-09 16:47:05.739', '2024-05-09 16:47:05.739');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (52, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Csodás Gumi Nadrág', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'A futball edzésre és szabadidős célokra is jó', 58700, '{https://picsum.photos/seed/H5UYA7e6K/640/480}', NULL, 44, '2024-05-09 16:47:05.888', '2024-05-09 16:47:05.888');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (41, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Fantasztikus Gránit Virsli', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 7000, '{https://loremflickr.com/640/480?lock=8989006257717248}', 'cs_test_a1oldYS8AnvthzkX26WGf1VySmn25Sy8YT71i7kw3pbmzIRxmApE1ecX86', 84, '2024-05-09 16:47:04.252', '2024-05-09 20:07:25.155');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (53, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Intelligens Friss Asztal', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 46500, '{https://picsum.photos/seed/Ke8kbXyEy/640/480}', NULL, 69, '2024-05-09 16:47:06.038', '2024-05-09 16:47:06.038');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (54, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Intelligens Gránit Cipő', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 41200, '{https://picsum.photos/seed/F3075/640/480}', NULL, 43, '2024-05-09 16:47:06.204', '2024-05-09 16:47:06.204');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (55, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Rusztikus Gránit Nadrág', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 27100, '{https://picsum.photos/seed/Kd4qHdj/640/480}', NULL, 46, '2024-05-09 16:47:06.349', '2024-05-09 16:47:06.349');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (56, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Gyönyörű Beton Virsli', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 48400, '{https://loremflickr.com/640/480?lock=4303958172499968}', NULL, 4, '2024-05-09 16:47:06.497', '2024-05-09 16:47:06.497');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (57, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kézzel készített Friss Cipő', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 42400, '{https://loremflickr.com/640/480?lock=5234895720808448}', NULL, 4, '2024-05-09 16:47:06.65', '2024-05-09 16:47:06.65');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (58, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Hihetetlen Gránit Virsli', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 79100, '{https://picsum.photos/seed/maBLctaVm/640/480}', NULL, 30, '2024-05-09 16:47:06.796', '2024-05-09 16:47:06.796');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (59, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Sima Műanyag Virsli', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 95100, '{https://loremflickr.com/640/480?lock=7349569144750080}', NULL, 81, '2024-05-09 16:47:06.953', '2024-05-09 16:47:06.953');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (60, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kifinomult Fagyott Számítógép', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 40900, '{https://picsum.photos/seed/BpEf35ng/640/480}', NULL, 13, '2024-05-09 16:47:07.094', '2024-05-09 16:47:07.094');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (61, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Csodás Beton Szék', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 95400, '{https://loremflickr.com/640/480?lock=926659635052544}', NULL, 85, '2024-05-09 16:47:07.252', '2024-05-09 16:47:07.252');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (62, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Márka nélküli Pamut Kesztyű', 'A futball edzésre és szabadidős célokra is jó', 'Az autó elrendezése az első motorból áll, a motor hátuljára szerelt áthelyezett kardántengelyű típusú sebességváltókkal és négykerék-hajtással', 37200, '{https://picsum.photos/seed/Ah615UzRKh/640/480}', NULL, 37, '2024-05-09 16:47:07.41', '2024-05-09 16:47:07.41');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (63, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Finom Fa Saláta', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 83800, '{https://loremflickr.com/640/480?lock=3695345041145856}', NULL, 61, '2024-05-09 16:47:07.56', '2024-05-09 16:47:07.56');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (64, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kicsi Beton Autó', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 1400, '{https://picsum.photos/seed/9HUVo/640/480}', NULL, 37, '2024-05-09 16:47:07.722', '2024-05-09 16:47:07.722');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (65, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Csodás Friss Pizza', 'Az autó elrendezése az első motorból áll, a motor hátuljára szerelt áthelyezett kardántengelyű típusú sebességváltókkal és négykerék-hajtással', 'Az autó elrendezése az első motorból áll, a motor hátuljára szerelt áthelyezett kardántengelyű típusú sebességváltókkal és négykerék-hajtással', 48200, '{https://picsum.photos/seed/eoMc8L/640/480}', NULL, 61, '2024-05-09 16:47:07.871', '2024-05-09 16:47:07.871');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (66, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Gyönyörű Beton Csirke', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 39700, '{https://loremflickr.com/640/480?lock=5768698579124224}', NULL, 100, '2024-05-09 16:47:08.014', '2024-05-09 16:47:08.014');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (67, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kicsi Fagyott Tonhal', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 55200, '{https://loremflickr.com/640/480?lock=3376675567960064}', NULL, 23, '2024-05-09 16:47:08.173', '2024-05-09 16:47:08.173');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (68, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Ergonomikus Fa Tonhal', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 5500, '{https://picsum.photos/seed/Gx3cizrXhf/640/480}', NULL, 13, '2024-05-09 16:47:08.326', '2024-05-09 16:47:08.326');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (69, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Általános Acél Csipsz', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 51000, '{https://picsum.photos/seed/db0LY/640/480}', NULL, 28, '2024-05-09 16:47:08.479', '2024-05-09 16:47:08.479');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (70, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Fantasztikus Pamut Törölköző', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 74500, '{https://picsum.photos/seed/bo6QJ7/640/480}', NULL, 82, '2024-05-09 16:47:08.627', '2024-05-09 16:47:08.627');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (71, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Finom Pamut Sajt', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 30600, '{https://picsum.photos/seed/SwRNpRiVYi/640/480}', NULL, 78, '2024-05-09 16:47:08.777', '2024-05-09 16:47:08.777');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (72, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kézműves Pamut Sajt', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 93300, '{https://loremflickr.com/640/480?lock=3580938604773376}', NULL, 14, '2024-05-09 16:47:08.924', '2024-05-09 16:47:08.924');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (73, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Csodás Pamut Bicikli', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'Az autó elrendezése az első motorból áll, a motor hátuljára szerelt áthelyezett kardántengelyű típusú sebességváltókkal és négykerék-hajtással', 99300, '{https://picsum.photos/seed/Pd6kC/640/480}', NULL, 28, '2024-05-09 16:47:09.065', '2024-05-09 16:47:09.065');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (74, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Engedélyezett Puha Kalap', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 34900, '{https://loremflickr.com/640/480?lock=8092684033982464}', NULL, 62, '2024-05-09 16:47:09.208', '2024-05-09 16:47:09.208');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (75, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Ergonomikus Friss Tonhal', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 'Az autó elrendezése az első motorból áll, a motor hátuljára szerelt áthelyezett kardántengelyű típusú sebességváltókkal és négykerék-hajtással', 37600, '{https://loremflickr.com/640/480?lock=2517548958482432}', NULL, 56, '2024-05-09 16:47:09.361', '2024-05-09 16:47:09.361');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (76, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kézzel készített Acél Csirke', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 'A futball edzésre és szabadidős célokra is jó', 5300, '{https://loremflickr.com/640/480?lock=1017210803847168}', NULL, 54, '2024-05-09 16:47:09.508', '2024-05-09 16:47:09.508');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (77, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kézzel készített Fagyott Nadrág', 'A futball edzésre és szabadidős célokra is jó', 'Új ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Grafika, OS 10 Home, OS Office A & J 2016', 95700, '{https://picsum.photos/seed/CV2cxGR/640/480}', NULL, 57, '2024-05-09 16:47:09.656', '2024-05-09 16:47:09.656');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (78, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Hihetetlen Gránit Pizza', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 75700, '{https://loremflickr.com/640/480?lock=991739475132416}', NULL, 90, '2024-05-09 16:47:09.802', '2024-05-09 16:47:09.802');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (79, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Fantasztikus Gránit Nadrág', 'A futball edzésre és szabadidős célokra is jó', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 38600, '{https://picsum.photos/seed/cEV2SL/640/480}', NULL, 32, '2024-05-09 16:47:09.96', '2024-05-09 16:47:09.96');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (80, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Rusztikus Gránit Szalonna', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 3600, '{https://loremflickr.com/640/480?lock=1293442544041984}', NULL, 27, '2024-05-09 16:47:10.108', '2024-05-09 16:47:10.108');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (81, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Sima Pamut Pizza', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 31900, '{https://picsum.photos/seed/TXmqSS/640/480}', NULL, 77, '2024-05-09 16:47:10.252', '2024-05-09 16:47:10.252');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (82, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Hihetetlen Friss Billentyűzet', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 95700, '{https://picsum.photos/seed/dNOJsBQI1/640/480}', NULL, 4, '2024-05-09 16:47:10.403', '2024-05-09 16:47:10.403');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (83, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Sima Puha Szalonna', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 73300, '{https://loremflickr.com/640/480?lock=5974340147347456}', NULL, 43, '2024-05-09 16:47:10.546', '2024-05-09 16:47:10.546');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (84, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Fantasztikus Puha Számítógép', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 59800, '{https://picsum.photos/seed/rIFEyt1r/640/480}', NULL, 70, '2024-05-09 16:47:10.708', '2024-05-09 16:47:10.708');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (85, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kézzel készített Fa Csipsz', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 54700, '{https://picsum.photos/seed/t7CWsMd/640/480}', NULL, 76, '2024-05-09 16:47:10.852', '2024-05-09 16:47:10.852');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (86, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kézműves Fém Törölköző', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 19300, '{https://picsum.photos/seed/aXQ1V9a/640/480}', NULL, 95, '2024-05-09 16:47:11.014', '2024-05-09 16:47:11.014');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (87, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Márka nélküli Fagyott Billentyűzet', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 78800, '{https://picsum.photos/seed/K7xfV7S/640/480}', NULL, 56, '2024-05-09 16:47:11.16', '2024-05-09 16:47:11.16');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (88, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Csodás Fém Ing', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 32700, '{https://loremflickr.com/640/480?lock=1615803006844928}', NULL, 16, '2024-05-09 16:47:11.325', '2024-05-09 16:47:11.325');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (89, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Sima Műanyag Törölköző', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 95500, '{https://picsum.photos/seed/hGqkyZl/640/480}', NULL, 19, '2024-05-09 16:47:11.479', '2024-05-09 16:47:11.479');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (90, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Ergonomikus Beton Virsli', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 35800, '{https://picsum.photos/seed/CT1rd/640/480}', NULL, 46, '2024-05-09 16:47:11.633', '2024-05-09 16:47:11.633');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (91, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Gyönyörű Pamut Asztal', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 36600, '{https://picsum.photos/seed/Z7B7DX/640/480}', NULL, 92, '2024-05-09 16:47:11.785', '2024-05-09 16:47:11.785');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (92, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Fantasztikus Beton Labda', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 65600, '{https://picsum.photos/seed/DOuaPZSeH/640/480}', NULL, 59, '2024-05-09 16:47:11.936', '2024-05-09 16:47:11.936');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (93, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Finom Pamut Tonhal', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'A formális ingek új sorozatát Önt szem előtt tartva terveztük. Illeszkedéssel és stílussal, amellyel kitűnik a tömegből', 99000, '{https://picsum.photos/seed/wRLs670dX/640/480}', NULL, 80, '2024-05-09 16:47:12.079', '2024-05-09 16:47:12.079');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (94, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Csodás Pamut Nadrág', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 80400, '{https://picsum.photos/seed/aLHrbQi/640/480}', NULL, 48, '2024-05-09 16:47:12.231', '2024-05-09 16:47:12.231');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (95, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Praktikus Pamut Labda', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'Új ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Grafika, OS 10 Home, OS Office A & J 2016', 83100, '{https://picsum.photos/seed/UorN6x/640/480}', NULL, 27, '2024-05-09 16:47:12.375', '2024-05-09 16:47:12.375');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (96, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Sima Friss Nadrág', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 7500, '{https://picsum.photos/seed/tKRCZ5d/640/480}', NULL, 53, '2024-05-09 16:47:12.556', '2024-05-09 16:47:12.556');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (97, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Általános Fagyott Törölköző', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 29100, '{https://picsum.photos/seed/f0kSF3NJ8/640/480}', NULL, 50, '2024-05-09 16:47:12.703', '2024-05-09 16:47:12.703');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (98, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Intelligens Gumi Szappan', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 66500, '{https://picsum.photos/seed/FWaRTH/640/480}', NULL, 4, '2024-05-09 16:47:12.85', '2024-05-09 16:47:12.85');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (99, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kézműves Gumi Egér', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 'A futball edzésre és szabadidős célokra is jó', 23600, '{https://loremflickr.com/640/480?lock=4957941010530304}', NULL, 82, '2024-05-09 16:47:12.995', '2024-05-09 16:47:12.995');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (100, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kifinomult Fa Számítógép', 'Ergonomikus főnöki szék ragasztott fekete bőrrel és PVC párnázott üléssel és háttámlával az egész napos kényelemért és támogatásért', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 37400, '{https://picsum.photos/seed/IkiNYX/640/480}', NULL, 7, '2024-05-09 16:47:13.145', '2024-05-09 16:47:13.145');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (3, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kézműves Műanyag Nadrág', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'Az Andy cipőket a tartósságot és a trendeket szem előtt tartva tervezték, a cipők és szandálok legstílusosabb választéka', 22900, '{https://loremflickr.com/640/480?lock=2645540875534336}', 'cs_test_b1tVSOQJqR0GGh1Kjew3V77TKQatgpVwQpV9ibBOuZW1BwpbccZWNKoTcL', 77, '2024-05-09 16:46:58.064', '2024-05-09 19:44:17.962');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (1, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Kézzel készített Műanyag Asztal', 'A karbonithálós kapuskesztyűk ergonomikus kialakításúak, hogy könnyen illeszkedjenek', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 24500, '{https://loremflickr.com/640/480?lock=6257798295846912}', 'cs_test_b1tVSOQJqR0GGh1Kjew3V77TKQatgpVwQpV9ibBOuZW1BwpbccZWNKoTcL', 74, '2024-05-09 16:46:57.6', '2024-05-09 19:44:17.962');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (32, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Rusztikus Fa Asztal', 'Az Apple Naturalé termékcsaládja, amely természetes összetevők izgalmas keverékét tartalmazza. 100%-ban természetes összetevőkkel', 'A Dev Byte vékony és egyszerű Maple Gaming billentyűzete elegáns testtel és 7 színű RGB LED-es háttérvilágítással rendelkezik az intelligens funkcionalitás érdekében', 23900, '{https://loremflickr.com/640/480?lock=7275935290097664}', 'cs_test_b1XjMTPAS90j5CZSIrmAKvMFln904XnCyRw0PENuWz6DApzqR9rjU1nCBa', 41, '2024-05-09 16:47:02.805', '2024-05-09 20:11:22.235');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (40, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Sima Puha Saláta', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 'A Nagasaki Lander több Nagasaki sportkerékpár-sorozat védjegyzett neve, amelyek az 1984-es ABC800J-vel indultak', 4600, '{https://picsum.photos/seed/gYLSPIlXY/640/480}', 'cs_test_b1XjMTPAS90j5CZSIrmAKvMFln904XnCyRw0PENuWz6DApzqR9rjU1nCBa', 88, '2024-05-09 16:47:04.107', '2024-05-09 20:11:22.235');
INSERT INTO public."ShopItem" (id, "organizationId", name, "shortDescription", description, price, images, "orderId", stock, "createdAt", "updatedAt") VALUES (2, 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x', 'Intelligens Pamut Egér', 'Boston legfejlettebb kompressziós-viselet technológiája növeli az izmok oxigénellátását, stabilizálja az aktív izmokat', 'Az Apollotech B340 egy megfizethető vezetékmentes egér, megbízható kapcsolattal, 12 hónapos akkumulátoridővel és modern dizájnnal', 8400, '{https://picsum.photos/seed/wqDiQuIJB/640/480}', 'cs_test_b1XjMTPAS90j5CZSIrmAKvMFln904XnCyRw0PENuWz6DApzqR9rjU1nCBa', 42, '2024-05-09 16:46:57.92', '2024-05-09 20:11:22.235');


--
-- TOC entry 3375 (class 0 OID 114711)
-- Dependencies: 215
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: UltraMarket_owner
--

INSERT INTO public."User" (id, "createdAt", "updatedAt") VALUES ('user_2fLST3UGHEDKEgQE886oJm34bhb', '2024-05-09 16:46:57.25', '2024-05-09 16:46:57.25');
INSERT INTO public."User" (id, "createdAt", "updatedAt") VALUES ('user_2fNGyDffJyvndJ5vl3z7Ta10P0U', '2024-05-09 20:07:25.155', '2024-05-09 20:07:25.155');


--
-- TOC entry 3382 (class 0 OID 114755)
-- Dependencies: 222
-- Data for Name: _CategoryToShopItem; Type: TABLE DATA; Schema: public; Owner: UltraMarket_owner
--

INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (1, 1);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (1, 2);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (2, 3);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (3, 4);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (5, 6);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (3, 7);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (4, 8);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (6, 9);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (3, 10);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (3, 11);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (5, 12);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (4, 13);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (7, 14);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (4, 15);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (8, 16);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (7, 17);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (7, 18);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (9, 19);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (7, 20);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (10, 21);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (8, 22);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (7, 23);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (11, 24);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (12, 25);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (13, 26);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (1, 27);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (14, 28);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (15, 29);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (12, 30);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (3, 31);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (5, 32);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (16, 33);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (3, 34);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (15, 35);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (17, 36);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (7, 37);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (18, 38);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (19, 39);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (3, 40);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (11, 41);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (6, 42);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (2, 43);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (20, 44);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (14, 45);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (17, 46);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (18, 47);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (1, 48);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (8, 49);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (5, 50);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (13, 51);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (7, 52);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (21, 53);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (2, 54);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (17, 55);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (19, 56);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (14, 57);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (18, 58);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (14, 59);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (9, 60);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (18, 61);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (20, 62);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (3, 63);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (17, 64);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (1, 65);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (9, 66);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (8, 67);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (2, 68);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (14, 69);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (17, 70);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (12, 71);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (1, 72);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (1, 73);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (17, 74);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (10, 75);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (16, 76);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (8, 77);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (19, 78);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (19, 79);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (8, 80);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (12, 81);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (10, 82);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (16, 83);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (10, 84);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (16, 85);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (3, 86);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (9, 87);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (13, 88);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (5, 89);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (19, 90);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (8, 91);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (19, 92);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (1, 93);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (2, 94);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (16, 95);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (12, 96);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (10, 97);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (13, 98);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (14, 99);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (11, 100);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (4, 5);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (10, 5);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (22, 5);
INSERT INTO public."_CategoryToShopItem" ("A", "B") VALUES (23, 5);


--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 219
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: UltraMarket_owner
--

SELECT pg_catalog.setval('public."Category_id_seq"', 23, true);


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 217
-- Name: ShopItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: UltraMarket_owner
--

SELECT pg_catalog.setval('public."ShopItem_id_seq"', 1, false);


--
-- TOC entry 3221 (class 2606 OID 114746)
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- TOC entry 3223 (class 2606 OID 114754)
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- TOC entry 3216 (class 2606 OID 114726)
-- Name: Organization Organization_pkey; Type: CONSTRAINT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."Organization"
    ADD CONSTRAINT "Organization_pkey" PRIMARY KEY (id);


--
-- TOC entry 3218 (class 2606 OID 114736)
-- Name: ShopItem ShopItem_pkey; Type: CONSTRAINT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."ShopItem"
    ADD CONSTRAINT "ShopItem_pkey" PRIMARY KEY (id);


--
-- TOC entry 3213 (class 2606 OID 114718)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3219 (class 1259 OID 114759)
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: UltraMarket_owner
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- TOC entry 3214 (class 1259 OID 114758)
-- Name: Organization_ownerId_key; Type: INDEX; Schema: public; Owner: UltraMarket_owner
--

CREATE UNIQUE INDEX "Organization_ownerId_key" ON public."Organization" USING btree ("ownerId");


--
-- TOC entry 3224 (class 1259 OID 114760)
-- Name: _CategoryToShopItem_AB_unique; Type: INDEX; Schema: public; Owner: UltraMarket_owner
--

CREATE UNIQUE INDEX "_CategoryToShopItem_AB_unique" ON public."_CategoryToShopItem" USING btree ("A", "B");


--
-- TOC entry 3225 (class 1259 OID 114761)
-- Name: _CategoryToShopItem_B_index; Type: INDEX; Schema: public; Owner: UltraMarket_owner
--

CREATE INDEX "_CategoryToShopItem_B_index" ON public."_CategoryToShopItem" USING btree ("B");


--
-- TOC entry 3229 (class 2606 OID 114777)
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3226 (class 2606 OID 114762)
-- Name: Organization Organization_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."Organization"
    ADD CONSTRAINT "Organization_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3227 (class 2606 OID 114772)
-- Name: ShopItem ShopItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."ShopItem"
    ADD CONSTRAINT "ShopItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3228 (class 2606 OID 114767)
-- Name: ShopItem ShopItem_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."ShopItem"
    ADD CONSTRAINT "ShopItem_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3230 (class 2606 OID 114782)
-- Name: _CategoryToShopItem _CategoryToShopItem_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."_CategoryToShopItem"
    ADD CONSTRAINT "_CategoryToShopItem_A_fkey" FOREIGN KEY ("A") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3231 (class 2606 OID 114787)
-- Name: _CategoryToShopItem _CategoryToShopItem_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UltraMarket_owner
--

ALTER TABLE ONLY public."_CategoryToShopItem"
    ADD CONSTRAINT "_CategoryToShopItem_B_fkey" FOREIGN KEY ("B") REFERENCES public."ShopItem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: UltraMarket_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-05-10 01:00:48

--
-- PostgreSQL database dump complete
--

