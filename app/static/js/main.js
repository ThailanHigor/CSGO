const steps = {
    init: function () {
        steps.firstStep();
        steps.secondStep();
        steps.thirdStep();
        steps.finalStep();
    },
    firstStep: function () {

    },
    secondStep: function () {
        $(".radial-first-step").click(function () {
            let weapon_type_id = $(this).data("id");
            $('.category-selected-input').val(weapon_type_id);

            $.ajax({
                url: "/steps/getWeaponsByCategory",
                data: { weapon_type_id: weapon_type_id },
                type: 'GET',
                dataType: "json",
            }).done(function (data) {
                let secondRadial = "";

                data.weapons.map((weapon, index) => {
                    secondRadial +=
                        `<li>
                            <a href="javascript:void(0)" class="weapon-${index+1} radial-second-step" data-id="${weapon.id}" data-slug="${weapon.slug}" data-filter="${weapon.filter_term}">
                                <img class="arma-radial" src="/static/images/armasRadial/${weapon.image}" alt="">
                                <span>${weapon.name}</span>
                                <div></div>
                            </a>
                        </li>
                        `
                });

                secondRadial += `  <li class="close"><a href="javascript:void(0)"  style="border: none;"> </a></li>`

                $(".section-second-step ul").html(secondRadial);

                $(".section-first-step").hide();
                $(".section-second-step").hide();
                $(".section-second-step").fadeIn(500);

                $(".message-step").hide();
                $(".message-step").text(data.message);
                $(".message-step").fadeIn(500);
            });

        });
    },

    thirdStep: function () {
        $("body").delegate(".radial-second-step", "click", (function () {
            let weaponSelectedSlug= $(this).data("slug");
            let weaponSelectedId = $(this).data("id");
            $('.weapon-selected-input').val($(this).data("filter"));

            $.ajax({
                url: "/steps/getSkinsFromWeapon",
                data: { weaponSelectedSlug: weaponSelectedSlug, weaponSelectedId: weaponSelectedId },
                type: 'GET',
                dataType: "json",
            }).done(function (data) {
                let skinsList = "";

                data.skins.map(function (skin) {
                    skinsList +=
                        `<div class="edgtf-sb-main-stream-item edgtf-item-space skin-item-third-step" data-id="${skin.id}" data-slug="${skin.slug}" data-filter="${skin.filter_term}">
                        <div class="edgtf-sb-main-stream-holder box-skin">
                            <img src="/static/images/skins${skin.image}" class="attachment-full"> 
                            <div class="edgtf-sb-text-holder box-holder">
                                <div class="edgtf-sb-channel">${skin.category}</div>
                                <h3 class="edgtf-sb-title">
                                    ${skin.name} </h3>
                            </div>
                        </div>
                    </div>`
                });

                skinsList += `<li class="close"><a href="javascript:void(0)"  style="border: none;"> </a></li>`

                $(".section-third-step .section-third-step-itens").html(skinsList);

                $(".section-second-step").hide();
                $(".section-third-step").hide();
                $(".section-third-step").fadeIn(500);

                $(".message-step").hide();
                $(".message-step").text(data.message);
                $(".message-step").fadeIn(500);
            });

        }));
    },

    finalStep: function () {
        $("body").delegate(".skin-item-third-step", "click", (function () {
            let skinSelected = $(this).data("filter");
            let skinSelectedId = $(this).data("id");
            let weaponSelected = $(".weapon-selected-input").val();
            $('.skin-selected-input').val($(this).data("filter"));

            $.ajax({
                url: "/steps/getSkinInfo",
                data: { skinSelected: skinSelected, weaponSelected: weaponSelected, skinSelectedId: skinSelectedId },
                type: 'GET',
                dataType: "json"
            }).done(function (data) {
                let priceTable = "";

                data.prices.map(function (data) {

                    priceTable +=
                        `<tr>
                            <th scope="row">${data.Float}</th>
                            <td><a href="${data.LinkBleik}" target="__blank">${data.PriceBleik}</a></td>
                            <td><a href="${data.LinkCSGOStore}" target="__blank">${data.PriceCSGOStore}</a></td>
                            <td><a href="${data.LinkNesha}" target="__blank">${data.PriceNesha}</a></td>
                        </tr>`

                });

                $(".section-final-step .table-comparation tbody").html(priceTable);

                $(".title-final-step").text(data.name);
                $(".image-final-step").attr("src", `/static/images/skins${data.image}`);

                $(".section-third-step").hide();
                $(".section-final-step").hide();
                $(".section-final-step").fadeIn(500);

                $(".message-step").hide();
                $(".message-step").text(data.message);
                $(".message-step").fadeIn(500);


            });

        }));
    },
}

steps.init();