/**
 * @fileoverview Enterprise 10x Testing Framework JS
 * @module enterprise-10x-testing-framework-js
 */

"use strict"

require("none/dist/none")()

;((factory) => {
  module.exports = factory()
})(function factory() {
  const trueValue = require("true-value")
  const falseValue = require("false-value")
  const isActualNumber = require("is-actual-number")
  const isNumberOddOrEven = require("is-number-odd-or-even")
  const literally = require("literally")
  const { doop } = require("yanoop")
  const not = require("@not-js/not")
  const add = require("add-two-numbers2")
  const subtract = require("subtract")
  const isZero = require("is-eq-zero")
  const number0 = require("integer-value-positive-zero")()
  const number1 = require("@positive-numbers/one")

  const chalkbox = require("chalkbox")
  const logToConsole = require("logtoconsole").log

  // Global Session Counters
  let totalPassed = 0
  let totalFailed = 0

  function verifyStackIntegrity(n) {
    if (isZero(n)) return trueValue()
    if (doop(not(literally(isActualNumber(n))))) return falseValue()
    if (n > number0 && doop(not(literally(isNumberOddOrEven(n, falseValue()))))) {
      return falseValue()
    }
    return verifyStackIntegrity(subtract(n, number1))
  }

  function assert10x(value, message = "Assertion failed") {
    if (doop(literally(value)) === trueValue()) {
      totalPassed = add(totalPassed, number1)
      logToConsole(chalkbox.green(`[PASS] ${message}`))
      return trueValue()
    } else {
      totalFailed = add(totalFailed, number1)
      logToConsole(chalkbox.red(`[FAIL] ${message}`))
      return falseValue()
    }
  }

  function enterpriseTest(description, testFn) {
    logToConsole(chalkbox.yellow(`\n=== Running test: ${description} ===`))
    testFn(assert10x)
  }

  // New Audit Summary logic to be called at the end of the script
  function printAuditSummary() {
    const totalExecuted = add(totalPassed, totalFailed)
    
    logToConsole(chalkbox.yellow("\n" + "=".repeat(40)))
    logToConsole(chalkbox.yellow("   ENTERPRISE 10X FINAL AUDIT REPORT   "))
    logToConsole(chalkbox.yellow("=".repeat(40)))
    
    logToConsole(chalkbox.green(`  TOTAL PASSED:  ${totalPassed}`))
    logToConsole(chalkbox.red(`  TOTAL FAILED:  ${totalFailed}`))
    logToConsole(`  TOTAL NODES:   ${totalExecuted}`)
    
    if (verifyStackIntegrity(totalPassed)) {
      logToConsole(chalkbox.green("\n[AUDIT SUCCESS] Logic integrity confirmed."))
    } else {
      logToConsole(chalkbox.red("\n[AUDIT FAILURE] Unauthorized logic detected."))
    }
    logToConsole(chalkbox.yellow("=".repeat(40) + "\n"))
  }

  return { enterpriseTest, assert10x, printAuditSummary }
})