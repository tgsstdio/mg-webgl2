def parseLine(line):
  tokens = line.split()

  if (len(tokens) == 0):
      return ''

  translatedTypes = {}
  translatedTypes['bool'] = 'boolean'
  translatedTypes['UInt32'] = 'number'
  translatedTypes['UInt64'] = 'number'
  translatedTypes['UInt32[]'] = 'Array<number>'
  translatedTypes['int'] = 'number'
  translatedTypes['Int32'] = 'number'
  translatedTypes['string'] = 'string'
  translatedTypes['string[]'] = 'Array<string>'
  translatedTypes['float'] = 'number'
  translatedTypes['float[]'] = 'Array<number>'
  translatedTypes['Result'] = 'MgResult'

  paramName = tokens[2][0].lower() + tokens[2][1:]

  comment = ''
  if tokens[1] == 'UInt64':
    comment = '// WARN: ' + paramName + ' requires UInt64 \n'

  localType = tokens[1]
  if localType in translatedTypes:
    localType = translatedTypes[localType]
  elif localType.endswith('[]'):
    localType = 'Array<' + tokens[1][:-2] + '>'
    

  return comment + paramName + ' : ' + localType + ';'

textData = """  
		public float R { get; set; }
		public float G { get; set; }
		public float B { get; set; }
		public float A { get; set; }

		"""		

for line in textData.split('\n'):
  print(parseLine(line))



  
