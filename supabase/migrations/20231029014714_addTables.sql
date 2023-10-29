create table "public"."bathrooms" (
    "id" uuid not null default gen_random_uuid(),
    "house_id" uuid not null,
    "trip_item_exists" boolean not null,
    "sharp_corner_exists" boolean not null,
    "handle_bar_exists" boolean not null,
    "room_brightness" bigint not null,
    "clear_path_to_light_exists" boolean not null,
    "easy_flashlight_placement_exists" boolean not null,
    "nonslip_mats_exists" boolean not null,
    "raised_toilet_exists" boolean not null,
    "support_bars_exists" boolean not null,
    "regulated_water_temp_exists" boolean not null,
    "adequate_ventilation_exists" boolean not null
);


alter table "public"."bathrooms" enable row level security;

create table "public"."bedrooms" (
    "id" uuid not null default gen_random_uuid(),
    "house_id" uuid not null,
    "trip_item_exists" boolean not null,
    "sharp_corner_exists" boolean not null,
    "handle_bar_exists" boolean not null,
    "room_brightness" bigint not null,
    "clear_path_to_light_exists" boolean not null,
    "easy_flashlight_placement_exists" boolean not null,
    "lamp_within_reach_exists" boolean not null,
    "lit_bed_to_bath_exists" boolean not null,
    "secured_carpets_exists" boolean not null,
    "bed_telephone_access_exists" boolean not null,
    "trip_bed_to_bath_exists" boolean not null
);


alter table "public"."bedrooms" enable row level security;

create table "public"."houses" (
    "id" uuid not null default gen_random_uuid(),
    "house_name" text not null,
    "num_people" bigint not null,
    "num_elderly" bigint not null,
    "type_house" text not null,
    "temp" text not null,
    "num_floors" bigint not null,
    "user_id" uuid not null
);


alter table "public"."houses" enable row level security;

create table "public"."kitchens" (
    "id" uuid not null default gen_random_uuid(),
    "house_id" uuid not null,
    "trip_item_exists" boolean not null,
    "sharp_corner_exists" boolean not null,
    "handle_bar_exists" boolean not null,
    "room_brightness" bigint not null,
    "clear_path_to_light_exists" boolean not null,
    "easy_flashlight_placement_exists" boolean not null,
    "reachable_kitchen_items_exists" boolean not null,
    "reachable_extinguisher_exists" boolean not null,
    "nonslip_rugs_exists" boolean not null
);


alter table "public"."kitchens" enable row level security;

create table "public"."living_rooms" (
    "id" uuid not null default gen_random_uuid(),
    "house_id" uuid not null,
    "trip_item_exists" boolean not null,
    "sharp_corner_exists" boolean not null,
    "handle_bar_exists" boolean not null,
    "room_brightness" bigint not null,
    "clear_path_to_light_exists" boolean not null,
    "easy_flashlight_placement_exists" boolean not null,
    "furniture_out_of_traffic_exists" boolean not null,
    "easy_access_main_seating_exists" boolean not null,
    "secured_electrical_cords_exists" boolean not null,
    "adequate_lighting_exists" boolean not null,
    "clutter_lead_to_fall_exists" boolean not null
);


alter table "public"."living_rooms" enable row level security;

create table "public"."stairs" (
    "id" uuid not null default gen_random_uuid(),
    "house_id" uuid not null,
    "trip_item_exists" boolean not null,
    "sharp_corner_exists" boolean not null,
    "handle_bar_exists" boolean not null,
    "room_brightness" bigint not null,
    "clear_path_to_light_exists" boolean not null,
    "easy_flashlight_placement_exists" boolean not null,
    "handrails_exists" boolean not null,
    "even_steps_exists" boolean not null,
    "adequate_lighting_exists" boolean not null,
    "clear_of_trip_hazards_exists" boolean not null,
    "visible_edges_exists" boolean not null
);


alter table "public"."stairs" enable row level security;

create table "public"."user_info" (
    "id" uuid not null,
    "name" text not null,
    "age" bigint not null,
    "mobility_level" bigint not null,
    "eyesight" bigint not null,
    "muscle_strength" bigint not null,
    "past_fall_history" boolean not null,
    "assistive_devices_usage" boolean not null,
    "incontinence" boolean not null
);


alter table "public"."user_info" enable row level security;

CREATE UNIQUE INDEX bathrooms_pkey ON public.bathrooms USING btree (id);

CREATE UNIQUE INDEX bedrooms_pkey ON public.bedrooms USING btree (id);

CREATE UNIQUE INDEX houses_pkey ON public.houses USING btree (id);

CREATE UNIQUE INDEX kitchens_pkey ON public.kitchens USING btree (id);

CREATE UNIQUE INDEX living_rooms_pkey ON public.living_rooms USING btree (id);

CREATE UNIQUE INDEX stairs_pkey ON public.stairs USING btree (id);

CREATE UNIQUE INDEX user_info_pkey ON public.user_info USING btree (id);

alter table "public"."bathrooms" add constraint "bathrooms_pkey" PRIMARY KEY using index "bathrooms_pkey";

alter table "public"."bedrooms" add constraint "bedrooms_pkey" PRIMARY KEY using index "bedrooms_pkey";

alter table "public"."houses" add constraint "houses_pkey" PRIMARY KEY using index "houses_pkey";

alter table "public"."kitchens" add constraint "kitchens_pkey" PRIMARY KEY using index "kitchens_pkey";

alter table "public"."living_rooms" add constraint "living_rooms_pkey" PRIMARY KEY using index "living_rooms_pkey";

alter table "public"."stairs" add constraint "stairs_pkey" PRIMARY KEY using index "stairs_pkey";

alter table "public"."user_info" add constraint "user_info_pkey" PRIMARY KEY using index "user_info_pkey";

alter table "public"."bathrooms" add constraint "bathrooms_house_id_fkey" FOREIGN KEY (house_id) REFERENCES houses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."bathrooms" validate constraint "bathrooms_house_id_fkey";

alter table "public"."bedrooms" add constraint "bedrooms_house_id_fkey" FOREIGN KEY (house_id) REFERENCES houses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."bedrooms" validate constraint "bedrooms_house_id_fkey";

alter table "public"."houses" add constraint "houses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_info(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."houses" validate constraint "houses_user_id_fkey";

alter table "public"."kitchens" add constraint "kitchens_house_id_fkey" FOREIGN KEY (house_id) REFERENCES houses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."kitchens" validate constraint "kitchens_house_id_fkey";

alter table "public"."living_rooms" add constraint "living_rooms_house_id_fkey" FOREIGN KEY (house_id) REFERENCES houses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."living_rooms" validate constraint "living_rooms_house_id_fkey";

alter table "public"."stairs" add constraint "stairs_house_id_fkey" FOREIGN KEY (house_id) REFERENCES houses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."stairs" validate constraint "stairs_house_id_fkey";

alter table "public"."user_info" add constraint "user_info_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_info" validate constraint "user_info_id_fkey";



