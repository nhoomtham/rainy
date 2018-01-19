select * from jhi_user;
select * from ra_album;
select * from ra_shop;
select * from ra_shop_status;
select * from ra_user_favorite;

select * from databasechangelog;
update ra_shop set active = false where id = 11;
update ra_shop set location = ST_SetSRID(ST_MakePoint(23,-44.5),4326)
update ra_shop set location = st_GeomFromText('SRID=4326;POINT(34.774531 -96.6783449)')
update ra_shop set location = null
 
-- drop ra* tables
drop table ra_shop_status cascade;
drop table ra_album cascade;
drop table ra_shop cascade;

drop table jhi_entity_audit_event;
drop table jhi_persistent_audit_evt_data cascade;
drop table jhi_persistent_audit_event cascade;

drop table jhi_user cascade;
drop table jhi_authority cascade;
drop table jhi_social_user_connection cascade;
drop table jhi_user_authority cascade;
drop table databasechangelog;
drop table databasechangeloglock;

drop sequence hibernate_sequence;
drop sequence jhi_entity_audit_event_id_seq;
