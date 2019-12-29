# Setting up API Gateway

 


## Not using Lambda Proxy on Mapping to Lamdba Method

if you dont specify lambda proxy as below, you are in charge of mapping the http request to the lambda event.

api gateway 
added a response for header 500
On the integtration request section of the diagram if you DONT specify LAMBDA PROXY you will have to map
on the integration request for the path params 

a mapping of is needed

```bash
#set($allParams = $input.params())
#set($params = $allParams.get('path'))

{
 
"pathParameters" : {

    #foreach($paramName in $params.keySet())
    "$paramName" : "$util.escapeJavaScript($params.get($paramName))"
        #if($foreach.hasNext),#end
    #end
}

}
```

## Using Lambda Proxy On Method

if you specify lamba proxy on the method the event is the one used for testing in the sam env
The take home lesson is that api gateway can be used to customize the event passed into the lamdba
and that lamdba proxy gives the expected payload
