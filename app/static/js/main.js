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
            let slugSelected = $(this).data("slug");

            $.ajax({
                url: "/steps/getWeaponsByCategory",
                data: { category: slugSelected },
                type: 'GET',
                dataType: "json",
            }).done(function (data) {
                let secondRadial = "";

                data.weapons.map(function (weapon) {
                    secondRadial +=
                        `<li>
                        <a href="javascript:void(0)" class="${weapon.Slug} radial-second-step" data-slug="${weapon.Slug}">
                            <img class="arma-radial" src="/static/images/armasRadial/${weapon.Image}" alt="">
                            <span>${weapon.Name}</span>
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
            let weaponSelected = $(this).data("slug");

            $.ajax({
                url: "/steps/getSkinsFromWeapon",
                data: { weaponSelected: weaponSelected },
                type: 'GET',
                dataType: "json",
            }).done(function (data) {
                let skinsList = "";

                data.skins.map(function (skin) {
                    skinsList +=
                        `<div class="edgtf-sb-main-stream-item edgtf-item-space skin-item-third-step" data-slug="${skin.Slug}">
                        <div class="edgtf-sb-main-stream-holder box-skin">
                            <img src="/static/images/skins/${skin.Image}" class="attachment-full"> 
                            <div class="edgtf-sb-text-holder box-holder">
                                <div class="edgtf-sb-channel">${skin.Category}</div>
                                <h3 class="edgtf-sb-title">
                                    ${skin.Name} </h3>
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
            let skinSelected = $(this).data("slug");

            $.ajax({
                url: "/steps/getSkinInfo",
                data: { skinSelected: skinSelected },
                type: 'GET',
                dataType: "json"
            }).done(function (data) {
                let priceTable = "";

                data.prices.map(function (data) {

                    priceTable +=
                        `<tr>
                            <th scope="row">${data.Float}</th>
                            <td><a href="${data.LinkBleik}">${data.PriceBleik}</a></td>
                            <td><a href="${data.LinkCSGOStore}">${data.PriceCSGOStore}</a></td>
                            <td><a href="${data.LinkNesha}">${data.PriceNesha}</a></td>
                        </tr>`

                });

                $(".section-final-step .table-comparation tbody").html(priceTable);

                $(".title-final-step").text(data.name);
                $(".image-final-step").attr("src", `/static/images/skins/${data.image}`);

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