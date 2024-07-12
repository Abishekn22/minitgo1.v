import React, { useEffect } from "react";

function ReturnPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" py-md-1 ">
      <div className=" container  mt-3 py-4">
        <div className=" text-center py-3">
          <h3>Return Policy</h3>
          <h4 style={{ textDecoration: "underline" }}>General Return Policy</h4>
        </div>

        <section>
          <ol
            className="d-flex flex-column gap-2 px-5 "
            style={{ textAlign: "justify", fontSize: "18px" }}
          >
            <li>
              Applicabe products are returnable within the applicable return
              window if you've received them in a condition that is physically
              damaged, has missing parts or accessories, defective or different
              form thier descripiton on the product detail page on minitgo.com.
            </li>
            <li>
              If you refport an issue with your Smartphone, Tablet, Laptop, Air
              Conditioner, Washing Machine, Microwave, we may faciliate
              scheduling a technician visit to you location. This visit is
              scheduled by placing an order with minitgo through minitgo.com
              Home Services. Subject to minitgo.com Home Services Terms and
              Conditions, a resolution will be provided on the technician's
              evaluation report.
            </li>

            <li>
              Return will be processed only if:
              <ul>
                <li>
                  it is determined that the product was not damaged while in
                  your possession
                </li>
                <li>
                  The product is not different form what was shipped to you.
                </li>
                <li>
                  The product is returned in original condition (with brand's/
                  manufacturer's box, MRP tag intact, user manual, warranty card
                  and all the accessories therein).
                </li>
              </ul>
            </li>

            <li>
              If you wish to return an electronic device that stores any
              personal information please ensure that you have removed all such
              personal information from the device prior to returning, minitgo
              shall not be liable in any matter for any misuse or usage of such
              information.
            </li>

            <li>
              Products may not be eligible for return in some cases, including
              cases of buyer's remorse such as incorrect model or color of
              product ordered or incorrect product ordered.
            </li>

            <li>
              Products marked as "non-refundable" on the product detail page
              cannot be returned. However, in an unlikely event of damanged,
              defective or wrong item delevered to yu, we will provide a full
              refund or replacement as applicable. We may contact you to
              ascertain the damage or defect in the product prior to issuing
              refund/replacement. We reserve the right to pick up the product to
              ascertain the damagge or defect in the product prior to issuing
              refund/replacement.
            </li>

            <li>
              No additional information is required to return an eligible order
              unless otherwise noted in the category specify policy.
            </li>
            <li>
              Products may be eligible for replacement only if the same seller
              has the exact same item in stock.
            </li>
            <li>
              If the replacement request is placed and the seller does not have
              the exact same product in stock, a refund would be issued to you.
            </li>
            <li>
              Products purchased by international customers are not eligible for
              returns However, orders made by international customers are
              eligible for refunds and customers will have to contact customer
              service within 5 business days from <br></br>delivery date or
              estimated delivery date to claim refunds.
            </li>
            <li>
              About the Return window for minitgo Business orders,Most items
              purchased from seller listed on minitgo are returnable within the
              return window, except those that are explicitly identified as not
              returnable.{" "}
            </li>
            <li>
              In the event customers are found to be misuse the return policy bu
              excessively returning or not accepting the orders placed,minitgo
              reserves the right to warm and or suspend and/or block and or
              terminate such customer accounts as necessary.
            </li>
          </ol>
          <div className="d-flex flex-column gap-1 px-5">
            <span>
              Note: If you've received a non-returnable product in a damaged
              defective condition,you can contact us within 5 days from the
              delivery of the product.
            </span>
            <span>
              Note: All product categories are non-returnable for International
              Customers for Expert Orders.
            </span>
          </div>
        </section>
      </div>
      <br />
      <br />
    </div>
  );
}

export default ReturnPolicy;
