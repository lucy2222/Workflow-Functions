function getJobQuanity(qty, fileName, proofType, product, xmlPages, impoNumUp, reworkQty, lfGangGroup, operationList) {
  var finalQty = qty * 1.05
  var bindingStyle = getBindingStyle(operationList);

  if (fileName.find("_IMPO") != -1) {
      if (impoNumUp) {
          qty = Math.ceil(qty / impoNumUp);
      } else {
          qty = 1;
      }
      finalQty = qty
  }

  if (product == "Notepad") {
      if (qty >= 1000) {
          qty *= 1.02;
      } else {
          qty = qty * pages;
      }
      finalQty = qty
  }

  if (proofType == "PR_PROOF") {
      if (bindingStyle.find("perfectBound") != -1) {
          qty = 10;
      } else {
          qty = 5;
      }
      finalQty = qty
  }

  if (bindingStyle.find("addleStitch") != -1) {
      qty += 10;
      finalQty = qty
  }
  if (bindingStyle.find("coilBook") != -1) {
      qty += 3;
      finalQty = qty
  }

  if (bindingStyle.find("perfectBound") != -1) {
      qty += 10 + Math.floor((qty - 100) / 50 * 2);
      finalQty = qty
  }

  for (i = 0; i < operationList.length; i++) {
      var operation = operationList.getItem(i);
      var xmlOperationItem = operation.evalToString("./item", null);
      var xmlOperationName = operation.evalToString("./name", null);

      if ((xmlOperationName == "Folding") ||
          (xmlOperationName.find("Scor") != -1) ||
          (xmlOperationName == "Perforating")) {
          qty += 5;
          finalQty = qty
      }
      if (xmlOperationName.find("FoldFactory") != -1) {
          qty += 40;
          finalQty = qty
      }
      if (xmlOperationName == "Inserting") {
          qty += 40;
          finalQty = qty
      }
      if (xmlOperationName.find("Outsource") != -1) {
          if (qty <= 100) {
              qty *= 1.3;
          } else if (qty <= 250) {
              qty *= 1.12;
          } else if (qty <= 500) {
              qty *= 1.08;
          } else if (qty <= 1000) {
              qty *= 1.07;
          } else if (qty > 1000) {
              qty *= 1.12;
          }
          finalQty = qty
      }
  }

  if (lfGangGroup) {
      if (reworkQty) {
          finalQty = reworkQty;
      } else {
          finalQty = qty
      }
  }
  finalQty = Math.ceil(finalQty);
  return finalQty;
}
