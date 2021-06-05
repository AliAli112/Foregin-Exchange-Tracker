exports.messageBuilderDaily = function(emailaddress, name, base, exchange, sub){

    const mailOptions = {
      from: 'ForeignExchangeTracker@gmail.com',
      to: `${emailaddress}`,
      subject: 'Exchange Rate Daily Subscriptions',
      text: `Hello ${name}! You are subscribed to currency ${base} and ${sub}. Today the currencies are 1 ${base} to ${exchange} ${sub}`
    };
    
    return mailOptions
}

exports.messageBuilderConditional = function (emailaddress, name, base, condition, sub, exchange, subcondition){

    const mailOptions = {
      from: 'ForeignExchangeTracker@gmail.com',
      to: `${emailaddress}`,
      subject: 'Exchange Rate Conditional Subscriptions',
      text: `Hello ${name}! You are subscribed to the currencies ${base} and ${sub} under the condition that 1 ${base} is ${condition} ${subcondition} ${sub}. 
      At this moment the currencies are 1 ${base} to ${exchange} ${sub}. Happy Trading!`
    };
    
    return mailOptions
}